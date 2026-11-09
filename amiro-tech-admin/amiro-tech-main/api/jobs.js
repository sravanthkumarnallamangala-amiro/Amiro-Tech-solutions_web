import { read, write, storageMode } from './_lib/store.js'
import { seedJobs } from './_lib/jobs-seed.js'
import { send } from './_lib/http.js'

// Public list of published openings for the Careers page.
export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { error: 'Method not allowed.' }) }
  res.setHeader('Cache-Control', 'no-cache'); res.setHeader('Vercel-CDN-Cache-Control', 's-maxage=10, stale-while-revalidate=30')
  if (storageMode() === 'none') return send(res, 200, { configured: false, jobs: [] })
  try {
    let jobs = await read('jobs')
    if (!jobs) { jobs = seedJobs; await write('jobs', jobs) }
    const published = jobs.filter((job) => job.status === 'published').sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(({ id, title, discipline, vacancies, experience, location, workMode, skills, description, responsibilities, requirements }) => ({ id, title, discipline, vacancies, experience, location, workMode, skills, description, responsibilities, requirements }))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache'); res.setHeader('Vercel-CDN-Cache-Control', 's-maxage=10, stale-while-revalidate=30')
    return res.end(JSON.stringify({ configured: true, jobs: published }))
  } catch {
    return send(res, 502, { error: 'Jobs are temporarily unavailable.' })
  }
}
