export type AdminUser = { id: string; name: string; email: string; createdAt: string; createdBy: string; lastLoginAt: string | null }
export type JobStatus = 'draft' | 'published' | 'closed'
export type Job = {
  id: string; title: string; discipline: string; vacancies: number; experience: string; location: string
  workMode: 'Hybrid' | 'On-site' | 'Remote'; skills: string[]; description: string; responsibilities: string[]; requirements: string[]
  status: JobStatus; createdAt: string; updatedAt: string; createdBy: string
}
export type Activity = { id: string; at: string; actor: string; action: string; target: string }
export type Stats = {
  jobs: { total: number; published: number; draft: number; closed: number; vacancies: number }
  admins: number
  recentJobs: Job[]
  activity: Activity[]
}

export class ApiError extends Error {
  status: number
  configured?: boolean
  constructor(message: string, status: number, configured?: boolean) { super(message); this.status = status; this.configured = configured }
}

export async function api<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`/api/admin/${path}`, {
      method: options.method ?? 'GET',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'x-amiro-csrf': '1' },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
  } catch {
    throw new ApiError('Cannot reach the server. Check your connection and try again.', 0)
  }
  const data = (await response.json().catch(() => ({}))) as { error?: string; configured?: boolean }
  if (!response.ok) throw new ApiError(data.error ?? 'Something went wrong.', response.status, data.configured)
  return data as T
}

export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
export const number = (value: number) => new Intl.NumberFormat('en-IN').format(value)
export function ago(iso: string | null) {
  if (!iso) return 'Never'
  const seconds = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (seconds < 60) return 'Just now'
  const steps: [number, string][] = [[60, 'min'], [24, 'hr'], [30, 'day']]
  let value = seconds / 60
  for (const [limit, label] of steps) {
    if (value < limit) return `${Math.floor(value)} ${label}${Math.floor(value) === 1 ? '' : 's'} ago`
    value /= limit
  }
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
