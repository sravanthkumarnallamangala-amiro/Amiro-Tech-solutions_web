import { ago, api, type Stats } from './api'
import { Badge, Empty } from './ui'
import { useLoad } from './useLoad'

export function DashboardPage({ navigate }: { navigate: (to: string) => void }) {
  const { data, error, loading } = useLoad(() => api<Stats>('stats'))
  if (loading) return <p className="adm-muted" role="status">Loading dashboard…</p>
  if (error || !data) return <p className="adm-alert" role="alert">{error || 'Could not load the dashboard.'}</p>
  const cards = [
    { label: 'Published jobs', value: data.jobs.published, sub: `${data.jobs.vacancies} open vacancies`, to: '/admin/jobs' },
    { label: 'Draft / closed jobs', value: data.jobs.draft + data.jobs.closed, sub: `${data.jobs.draft} drafts · ${data.jobs.closed} closed`, to: '/admin/jobs' },
    { label: 'Total job postings', value: data.jobs.total, sub: 'Across all disciplines', to: '/admin/jobs' },
    { label: 'Administrators', value: data.admins, sub: 'With console access', to: '/admin/admins' },
  ]
  return (
    <>
      <div className="adm-kpis">
        {cards.map((card) => (
          <button className="adm-kpi" key={card.label} onClick={() => navigate(card.to)} type="button">
            <span>{card.label}</span><strong>{card.value}</strong><small>{card.sub}</small>
          </button>
        ))}
      </div>
      <div className="adm-quick">
        <button className="adm-btn adm-btn--primary" onClick={() => navigate('/admin/jobs?new=1')} type="button">+ Post a job</button>
        <button className="adm-btn" onClick={() => navigate('/admin/admins?new=1')} type="button">+ Add administrator</button>
      </div>
      <div className="adm-grid2">
        <section className="adm-card">
          <header><h2>Recent job posts</h2><button className="adm-link" onClick={() => navigate('/admin/jobs')} type="button">Manage jobs</button></header>
          {data.recentJobs.length === 0 ? <Empty title="No jobs yet">Post your first opening to show it on the Careers page.</Empty> : (
            <ul className="adm-rows">{data.recentJobs.map((job) => (
              <li key={job.id}><div><strong>{job.title}</strong><small>{job.discipline} · updated {ago(job.updatedAt)}</small></div><Badge tone={job.status === 'published' ? 'green' : job.status === 'draft' ? 'amber' : 'grey'}>{job.status}</Badge></li>
            ))}</ul>
          )}
        </section>
        <section className="adm-card">
          <header><h2>Recent activity</h2></header>
          {data.activity.length === 0 ? <Empty title="No activity yet" /> : (
            <ul className="adm-rows adm-rows--tight">{data.activity.map((entry) => (
              <li key={entry.id}><div><strong>{entry.actor}</strong> <span className="adm-muted">{entry.action}</span>{entry.target && <> <em>{entry.target}</em></>}</div><small>{ago(entry.at)}</small></li>
            ))}</ul>
          )}
        </section>
      </div>
    </>
  )
}
