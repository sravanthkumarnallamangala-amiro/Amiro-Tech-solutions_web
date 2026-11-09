import crypto from 'node:crypto'
import { read, write, storageMode } from './store.js'
import { seedJobs } from './jobs-seed.js'
import { bodyOf, clientIp, sameOriginWrite, send } from './http.js'
import { bootstrapCredentials, clearFailures, createSession, hashPassword, readSession, recordFailure, secret, sessionCookie, throttled, verifyPassword } from './auth.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const uid = () => crypto.randomUUID().replaceAll('-', '').slice(0, 12)
const text = (value, max, { required = false } = {}) => {
  if (value == null || value === '') return required ? null : ''
  if (typeof value !== 'string' || value.trim().length > max) return null
  return value.trim()
}
const intIn = (value, min, max) => (Number.isInteger(value) && value >= min && value <= max ? value : null)
const list = (value, maxItems, maxLen) => {
  if (!Array.isArray(value) || value.length > maxItems) return null
  const items = value.map((item) => (typeof item === 'string' ? item.trim() : null))
  return items.some((item) => item === null || item.length > maxLen) ? null : items.filter(Boolean)
}
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'role'

/* ------------------------------------------------------------------ data helpers */
async function loadJobs() {
  const jobs = await read('jobs')
  if (jobs) return jobs
  await write('jobs', seedJobs)
  return seedJobs
}
const loadList = (key) => read(key, [])
async function logActivity(actor, action, target) {
  const log = await loadList('activity')
  log.unshift({ id: uid(), at: new Date().toISOString(), actor, action, target })
  await write('activity', log.slice(0, 200))
}
const publicAdmin = ({ id, name, email, createdAt, createdBy, lastLoginAt }) => ({ id, name, email, createdAt, createdBy, lastLoginAt })

async function ensureBootstrapAdmin() {
  const admins = await loadList('admins')
  if (admins.length) return admins
  const creds = bootstrapCredentials()
  if (!creds) return admins
  const first = { id: uid(), name: 'Administrator', email: creds.email, passwordHash: await hashPassword(creds.password), createdAt: new Date().toISOString(), createdBy: 'system', lastLoginAt: null }
  await write('admins', [first])
  return [first]
}

/* ------------------------------------------------------------------ validation */
function validateJob(input, partial = false) {
  const out = {}
  const fail = (field) => ({ error: `Check the "${field}" field.` })
  const take = (key, value) => { if (value === null) throw fail(key); out[key] = value }
  try {
    if (!partial || 'title' in input) take('title', text(input.title, 120, { required: true }))
    if (!partial || 'discipline' in input) take('discipline', text(input.discipline, 80, { required: true }))
    if (!partial || 'vacancies' in input) take('vacancies', intIn(input.vacancies, 1, 99))
    if (!partial || 'experience' in input) take('experience', text(input.experience, 60))
    if (!partial || 'location' in input) take('location', text(input.location || 'Bengaluru', 80, { required: true }))
    if (!partial || 'workMode' in input) take('workMode', ['Hybrid', 'On-site', 'Remote'].includes(input.workMode) ? input.workMode : null)
    if (!partial || 'skills' in input) take('skills', list(input.skills, 15, 40))
    if (!partial || 'description' in input) take('description', text(input.description, 1000, { required: true }))
    if (!partial || 'responsibilities' in input) take('responsibilities', list(input.responsibilities, 12, 300))
    if (!partial || 'requirements' in input) take('requirements', list(input.requirements, 12, 300))
    if (!partial || 'status' in input) take('status', ['draft', 'published', 'closed'].includes(input.status) ? input.status : null)
  } catch (error) { return error }
  return { value: out }
}

/* ------------------------------------------------------------------ router */
export async function handleAdmin(req, res, segments) {
  const [resource, id, action] = segments
  const method = req.method

  if (storageMode() === 'none' || !secret()) {
    return send(res, 503, { error: 'Admin is not configured on this deployment. Connect a Redis/KV database and set SESSION_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD (see docs/admin-setup.md).', configured: false })
  }
  if (method !== 'GET' && !sameOriginWrite(req)) return send(res, 403, { error: 'Request blocked.' })

  /* ----- public auth endpoints ----- */
  if (resource === 'login' && method === 'POST') {
    const ip = clientIp(req)
    if (throttled(ip)) return send(res, 429, { error: 'Too many attempts. Please wait 15 minutes and try again.' })
    const body = await bodyOf(req)
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body?.password === 'string' ? body.password : ''
    if (!EMAIL.test(email) || !password || password.length > 200) return send(res, 400, { error: 'Enter your email and password.' })
    const admins = await ensureBootstrapAdmin()
    if (!admins.length) return send(res, 503, { error: 'No administrator is configured. Set ADMIN_EMAIL and ADMIN_PASSWORD.', configured: false })
    const admin = admins.find((item) => item.email === email)
    // Always run a hash comparison so response time does not reveal whether the email exists.
    const ok = await verifyPassword(password, admin?.passwordHash ?? 'scrypt$AAAAAAAAAAAAAAAAAAAAAA==$' + 'A'.repeat(86) + '==').catch(() => false)
    if (!admin || !ok) { recordFailure(ip); return send(res, 401, { error: 'Incorrect email or password.' }) }
    clearFailures(ip)
    admin.lastLoginAt = new Date().toISOString()
    await write('admins', admins)
    await logActivity(admin.email, 'signed in', '')
    res.setHeader('Set-Cookie', sessionCookie(req, createSession(admin)))
    return send(res, 200, { admin: publicAdmin(admin) })
  }
  if (resource === 'logout' && method === 'POST') {
    res.setHeader('Set-Cookie', sessionCookie(req, ''))
    return send(res, 200, { ok: true })
  }

  /* ----- everything below needs a valid session ----- */
  const session = readSession(req)
  const admins = session ? await loadList('admins') : []
  const me = admins.find((item) => item.id === session?.sub)
  if (!me) return send(res, 401, { error: 'Please sign in.' })

  if (resource === 'me' && method === 'GET') return send(res, 200, { admin: publicAdmin(me) })

  if (resource === 'me' && id === 'password' && method === 'POST') {
    const body = await bodyOf(req)
    if (typeof body?.current !== 'string' || typeof body?.next !== 'string') return send(res, 400, { error: 'Fill in both passwords.' })
    if (!(await verifyPassword(body.current, me.passwordHash))) return send(res, 403, { error: 'Current password is incorrect.' })
    if (body.next.length < 10 || body.next.length > 200) return send(res, 400, { error: 'Use at least 10 characters for the new password.' })
    me.passwordHash = await hashPassword(body.next)
    await write('admins', admins)
    await logActivity(me.email, 'changed their password', '')
    return send(res, 200, { ok: true })
  }

  /* ----- dashboard ----- */
  if (resource === 'stats' && method === 'GET') {
    const [jobs, activity] = await Promise.all([loadJobs(), loadList('activity')])
    return send(res, 200, {
      jobs: {
        total: jobs.length,
        published: jobs.filter((j) => j.status === 'published').length,
        draft: jobs.filter((j) => j.status === 'draft').length,
        closed: jobs.filter((j) => j.status === 'closed').length,
        vacancies: jobs.filter((j) => j.status === 'published').reduce((sum, j) => sum + j.vacancies, 0),
      },
      admins: admins.length,
      recentJobs: [...jobs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5),
      activity: activity.slice(0, 8),
    })
  }
  if (resource === 'activity' && method === 'GET') return send(res, 200, { activity: await loadList('activity') })

  /* ----- jobs ----- */
  if (resource === 'jobs') {
    const jobs = await loadJobs()
    if (!id && method === 'GET') return send(res, 200, { jobs: [...jobs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)) })
    if (!id && method === 'POST') {
      const result = validateJob((await bodyOf(req)) ?? {})
      if (result.error) return send(res, 400, result)
      const stamp = new Date().toISOString()
      let jobId = slug(result.value.title)
      if (jobs.some((job) => job.id === jobId)) jobId = `${jobId}-${uid().slice(0, 4)}`
      const job = { id: jobId, ...result.value, createdAt: stamp, updatedAt: stamp, createdBy: me.email }
      await write('jobs', [job, ...jobs])
      await logActivity(me.email, job.status === 'published' ? 'published job' : 'saved job draft', job.title)
      return send(res, 201, { job })
    }
    const index = jobs.findIndex((job) => job.id === id)
    if (index === -1) return send(res, 404, { error: 'Job not found.' })
    if (method === 'PUT') {
      const result = validateJob((await bodyOf(req)) ?? {}, true)
      if (result.error) return send(res, 400, result)
      const previous = jobs[index]
      jobs[index] = { ...previous, ...result.value, updatedAt: new Date().toISOString() }
      await write('jobs', jobs)
      const changed = result.value.status && result.value.status !== previous.status
      await logActivity(me.email, changed ? `marked job ${result.value.status}` : 'updated job', jobs[index].title)
      return send(res, 200, { job: jobs[index] })
    }
    if (method === 'DELETE') {
      const [removed] = jobs.splice(index, 1)
      await write('jobs', jobs)
      await logActivity(me.email, 'deleted job', removed.title)
      return send(res, 200, { ok: true })
    }
  }

  /* ----- administrators ----- */
  if (resource === 'admins') {
    if (!id && method === 'GET') return send(res, 200, { admins: admins.map(publicAdmin) })
    if (!id && method === 'POST') {
      const body = (await bodyOf(req)) ?? {}
      const name = text(body.name, 80, { required: true })
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
      if (!name || !EMAIL.test(email) || email.length > 254) return send(res, 400, { error: 'Enter a name and a valid email.' })
      if (typeof body.password !== 'string' || body.password.length < 10 || body.password.length > 200) return send(res, 400, { error: 'Use at least 10 characters for the password.' })
      if (admins.some((item) => item.email === email)) return send(res, 409, { error: 'An administrator with that email already exists.' })
      const admin = { id: uid(), name, email, passwordHash: await hashPassword(body.password), createdAt: new Date().toISOString(), createdBy: me.email, lastLoginAt: null }
      await write('admins', [...admins, admin])
      await logActivity(me.email, 'added administrator', email)
      return send(res, 201, { admin: publicAdmin(admin) })
    }
    const target = admins.find((item) => item.id === id)
    if (!target) return send(res, 404, { error: 'Administrator not found.' })
    if (action === 'password' && method === 'POST') {
      const body = (await bodyOf(req)) ?? {}
      if (typeof body.password !== 'string' || body.password.length < 10 || body.password.length > 200) return send(res, 400, { error: 'Use at least 10 characters for the password.' })
      target.passwordHash = await hashPassword(body.password)
      await write('admins', admins)
      await logActivity(me.email, 'reset password for', target.email)
      return send(res, 200, { ok: true })
    }
    if (method === 'DELETE' && !action) {
      if (target.id === me.id) return send(res, 400, { error: 'You cannot remove your own account.' })
      await write('admins', admins.filter((item) => item.id !== id))
      await logActivity(me.email, 'removed administrator', target.email)
      return send(res, 200, { ok: true })
    }
  }

  return send(res, 404, { error: 'Not found.' })
}
