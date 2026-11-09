import { useState, type FormEvent } from 'react'
import { ago, api, ApiError, type Job, type JobStatus } from './api'
import { Badge, Confirm, Empty, Modal } from './ui'
import { useToast } from './toast-context'
import { useLoad } from './useLoad'

const lines = (value: string) => value.split('\n').map((line) => line.trim()).filter(Boolean)
const tone = (status: JobStatus) => (status === 'published' ? 'green' : status === 'draft' ? 'amber' : 'grey')

function JobForm({ job, onDone, onClose }: { job: Job | null; onDone: () => void; onClose: () => void }) {
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: job?.title ?? '', discipline: job?.discipline ?? '', vacancies: String(job?.vacancies ?? 1), experience: job?.experience ?? '',
    location: job?.location ?? 'Bengaluru', workMode: job?.workMode ?? 'Hybrid', skills: (job?.skills ?? []).join(', '),
    description: job?.description ?? '', responsibilities: (job?.responsibilities ?? []).join('\n'), requirements: (job?.requirements ?? []).join('\n'),
    status: job?.status ?? 'published',
  })
  const set = (key: keyof typeof form) => (event: { target: { value: string } }) => setForm({ ...form, [key]: event.target.value })

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const body = {
      ...form, vacancies: Number(form.vacancies), skills: form.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      responsibilities: lines(form.responsibilities), requirements: lines(form.requirements),
    }
    try {
      await api(job ? `jobs/${job.id}` : 'jobs', { method: job ? 'PUT' : 'POST', body })
      toast(job ? 'Job updated' : form.status === 'published' ? 'Job posted — it is live on the Careers page' : 'Job saved')
      onDone()
    } catch (reason) {
      setError((reason as ApiError).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal onClose={onClose} title={job ? 'Edit job' : 'Post a job'} wide>
      <form className="adm-form" onSubmit={submit}>
        <div className="adm-cols">
          <label className="adm-field">Job title<input maxLength={90} onChange={set('title')} required value={form.title} /></label>
          <label className="adm-field">Team / discipline<input maxLength={60} onChange={set('discipline')} placeholder="e.g. Engineering" required value={form.discipline} /></label>
        </div>
        <div className="adm-cols adm-cols--4">
          <label className="adm-field">Vacancies<input max={99} min={1} onChange={set('vacancies')} required type="number" value={form.vacancies} /></label>
          <label className="adm-field">Experience<input onChange={set('experience')} placeholder="e.g. 0–2 years" required value={form.experience} /></label>
          <label className="adm-field">Location<input onChange={set('location')} required value={form.location} /></label>
          <label className="adm-field">Work mode
            <select onChange={set('workMode')} value={form.workMode}><option>Hybrid</option><option>On-site</option><option>Remote</option></select>
          </label>
        </div>
        <label className="adm-field">Skills <small>(comma separated)</small><input onChange={set('skills')} placeholder="React, Node.js, MongoDB" value={form.skills} /></label>
        <label className="adm-field">Description<textarea maxLength={1200} onChange={set('description')} required rows={3} value={form.description} /></label>
        <div className="adm-cols">
          <label className="adm-field">Responsibilities <small>(one per line)</small><textarea onChange={set('responsibilities')} rows={5} value={form.responsibilities} /></label>
          <label className="adm-field">Requirements <small>(one per line)</small><textarea onChange={set('requirements')} rows={5} value={form.requirements} /></label>
        </div>
        <label className="adm-field adm-field--short">Status
          <select onChange={set('status')} value={form.status}>
            <option value="published">Published — visible on Careers</option>
            <option value="draft">Draft — hidden</option>
            <option value="closed">Closed — hidden</option>
          </select>
        </label>
        {error && <p className="adm-alert" role="alert">{error}</p>}
        <div className="adm-actions">
          <button className="adm-btn" onClick={onClose} type="button">Cancel</button>
          <button className="adm-btn adm-btn--primary" disabled={busy} type="submit">{busy ? 'Saving…' : job ? 'Save changes' : 'Post job'}</button>
        </div>
      </form>
    </Modal>
  )
}

export function JobsPage() {
  const toast = useToast()
  const { data, error, reload, loading } = useLoad(() => api<{ jobs: Job[] }>('jobs'))
  const [editing, setEditing] = useState<Job | null | 'new'>(() => (new URLSearchParams(window.location.search).get('new') ? 'new' : null))
  const [removing, setRemoving] = useState<Job | null>(null)
  const [busy, setBusy] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const jobs = (data?.jobs ?? []).filter((job) => (status === 'all' || job.status === status) && `${job.title} ${job.discipline}`.toLowerCase().includes(query.toLowerCase()))

  async function setJobStatus(job: Job, next: JobStatus) {
    try {
      await api(`jobs/${job.id}`, { method: 'PUT', body: { ...job, status: next } })
      toast(next === 'published' ? `"${job.title}" is now live on Careers` : `"${job.title}" is now ${next}`)
      reload()
    } catch (reason) { toast((reason as ApiError).message, 'error') }
  }
  async function remove() {
    if (!removing) return
    setBusy(true)
    try { await api(`jobs/${removing.id}`, { method: 'DELETE' }); toast('Job deleted'); setRemoving(null); reload() }
    catch (reason) { toast((reason as ApiError).message, 'error') }
    finally { setBusy(false) }
  }

  return (
    <>
      <div className="adm-toolbar">
        <input aria-label="Search jobs" className="adm-search" onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs…" type="search" value={query} />
        <select aria-label="Filter by status" onChange={(event) => setStatus(event.target.value)} value={status}>
          <option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="closed">Closed</option>
        </select>
        <a className="adm-btn" href="/careers" rel="noreferrer" target="_blank">View Careers page ↗</a>
        <button className="adm-btn adm-btn--primary" onClick={() => setEditing('new')} type="button">+ Post a job</button>
      </div>
      {loading && <p className="adm-muted" role="status">Loading jobs…</p>}
      {error && <p className="adm-alert" role="alert">{error}</p>}
      {data && jobs.length === 0 && <Empty title="No jobs found">Post a job and it will appear on the public Careers page.</Empty>}
      {jobs.length > 0 && (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Role</th><th>Team</th><th>Vacancies</th><th>Location</th><th>Status</th><th>Updated</th><th><span className="adm-sr">Actions</span></th></tr></thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td data-label="Role"><strong>{job.title}</strong><small>{job.experience}</small></td>
                  <td data-label="Team">{job.discipline}</td>
                  <td data-label="Vacancies">{job.vacancies}</td>
                  <td data-label="Location">{job.location} · {job.workMode}</td>
                  <td data-label="Status"><Badge tone={tone(job.status)}>{job.status}</Badge></td>
                  <td data-label="Updated">{ago(job.updatedAt)}</td>
                  <td className="adm-row-actions">
                    {job.status === 'published'
                      ? <button className="adm-btn adm-btn--sm" onClick={() => setJobStatus(job, 'draft')} type="button">Unpublish</button>
                      : <button className="adm-btn adm-btn--sm" onClick={() => setJobStatus(job, 'published')} type="button">Publish</button>}
                    {job.status === 'published' && <button className="adm-btn adm-btn--sm" onClick={() => setJobStatus(job, 'closed')} type="button">Close</button>}
                    <button className="adm-btn adm-btn--sm" onClick={() => setEditing(job)} type="button">Edit</button>
                    <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => setRemoving(job)} type="button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editing && <JobForm job={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onDone={() => { setEditing(null); reload() }} />}
      {removing && <Confirm busy={busy} confirmLabel="Delete job" message={`Delete "${removing.title}"? It will be removed from the Careers page. This cannot be undone.`} onCancel={() => setRemoving(null)} onConfirm={remove} title="Delete this job?" />}
    </>
  )
}
