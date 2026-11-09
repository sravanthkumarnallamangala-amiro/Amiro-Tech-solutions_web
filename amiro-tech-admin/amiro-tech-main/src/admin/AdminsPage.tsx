import { useState, type FormEvent } from 'react'
import { ago, api, ApiError, type AdminUser } from './api'
import { Badge, Confirm, Modal } from './ui'
import { useToast } from './toast-context'
import { useLoad } from './useLoad'

function Password({ label, value, onChange, autoComplete }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string }) {
  return <label className="adm-field">{label}<input autoComplete={autoComplete} minLength={10} onChange={(event) => onChange(event.target.value)} required type="password" value={value} /><small>At least 10 characters.</small></label>
}

function AddAdmin({ onDone, onClose }: { onDone: () => void; onClose: () => void }) {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    try { await api('admins', { method: 'POST', body: form }); toast(`${form.name} can now sign in`); onDone() }
    catch (reason) { setError((reason as ApiError).message) } finally { setBusy(false) }
  }
  return (
    <Modal onClose={onClose} title="Add administrator">
      <form className="adm-form" onSubmit={submit}>
        <p className="adm-muted">Give this person a login. Share the password with them securely and ask them to change it after signing in.</p>
        <label className="adm-field">Full name<input onChange={(event) => setForm({ ...form, name: event.target.value })} required value={form.name} /></label>
        <label className="adm-field">Email<input autoComplete="off" onChange={(event) => setForm({ ...form, email: event.target.value })} required type="email" value={form.email} /></label>
        <Password autoComplete="new-password" label="Temporary password" onChange={(password) => setForm({ ...form, password })} value={form.password} />
        {error && <p className="adm-alert" role="alert">{error}</p>}
        <div className="adm-actions">
          <button className="adm-btn" onClick={onClose} type="button">Cancel</button>
          <button className="adm-btn adm-btn--primary" disabled={busy} type="submit">{busy ? 'Creating…' : 'Create login'}</button>
        </div>
      </form>
    </Modal>
  )
}

function ResetPassword({ admin, self, onDone, onClose }: { admin: AdminUser; self: boolean; onDone: () => void; onClose: () => void }) {
  const toast = useToast()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      if (self) await api('me/password', { method: 'POST', body: { current, next } })
      else await api(`admins/${admin.id}/password`, { method: 'POST', body: { password: next } })
      toast('Password updated'); onDone()
    } catch (reason) { setError((reason as ApiError).message) } finally { setBusy(false) }
  }
  return (
    <Modal onClose={onClose} title={self ? 'Change your password' : `Reset password — ${admin.name}`}>
      <form className="adm-form" onSubmit={submit}>
        {self && <label className="adm-field">Current password<input autoComplete="current-password" onChange={(event) => setCurrent(event.target.value)} required type="password" value={current} /></label>}
        <Password autoComplete="new-password" label="New password" onChange={setNext} value={next} />
        {error && <p className="adm-alert" role="alert">{error}</p>}
        <div className="adm-actions">
          <button className="adm-btn" onClick={onClose} type="button">Cancel</button>
          <button className="adm-btn adm-btn--primary" disabled={busy} type="submit">{busy ? 'Saving…' : 'Update password'}</button>
        </div>
      </form>
    </Modal>
  )
}

export function AdminsPage({ me }: { me: AdminUser }) {
  const toast = useToast()
  const { data, error, reload, loading } = useLoad(() => api<{ admins: AdminUser[] }>('admins'))
  const [adding, setAdding] = useState(() => Boolean(new URLSearchParams(window.location.search).get('new')))
  const [resetting, setResetting] = useState<AdminUser | null>(null)
  const [removing, setRemoving] = useState<AdminUser | null>(null)
  const [busy, setBusy] = useState(false)

  async function remove() {
    if (!removing) return
    setBusy(true)
    try { await api(`admins/${removing.id}`, { method: 'DELETE' }); toast('Administrator removed'); setRemoving(null); reload() }
    catch (reason) { toast((reason as ApiError).message, 'error') } finally { setBusy(false) }
  }

  return (
    <>
      <div className="adm-toolbar">
        <p className="adm-muted adm-grow">Everyone listed here can sign in to this console and manage jobs and other administrators.</p>
        <button className="adm-btn" onClick={() => setResetting(me)} type="button">Change my password</button>
        <button className="adm-btn adm-btn--primary" onClick={() => setAdding(true)} type="button">+ Add administrator</button>
      </div>
      {loading && <p className="adm-muted" role="status">Loading administrators…</p>}
      {error && <p className="adm-alert" role="alert">{error}</p>}
      {data && (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Name</th><th>Email</th><th>Added by</th><th>Last sign-in</th><th><span className="adm-sr">Actions</span></th></tr></thead>
            <tbody>
              {data.admins.map((admin) => (
                <tr key={admin.id}>
                  <td data-label="Name"><strong>{admin.name}</strong>{admin.id === me.id && <> <Badge tone="blue">You</Badge></>}</td>
                  <td data-label="Email">{admin.email}</td>
                  <td data-label="Added by">{admin.createdBy || '—'}</td>
                  <td data-label="Last sign-in">{ago(admin.lastLoginAt)}</td>
                  <td className="adm-row-actions">
                    {admin.id !== me.id && <>
                      <button className="adm-btn adm-btn--sm" onClick={() => setResetting(admin)} type="button">Reset password</button>
                      <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => setRemoving(admin)} type="button">Remove</button>
                    </>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {adding && <AddAdmin onClose={() => setAdding(false)} onDone={() => { setAdding(false); reload() }} />}
      {resetting && <ResetPassword admin={resetting} onClose={() => setResetting(null)} onDone={() => setResetting(null)} self={resetting.id === me.id} />}
      {removing && <Confirm busy={busy} confirmLabel="Remove access" message={`Remove ${removing.name} (${removing.email})? They will no longer be able to sign in.`} onCancel={() => setRemoving(null)} onConfirm={remove} title="Remove administrator?" />}
    </>
  )
}
