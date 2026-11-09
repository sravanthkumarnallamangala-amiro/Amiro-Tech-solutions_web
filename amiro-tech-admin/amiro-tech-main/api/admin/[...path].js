import { handleAdmin } from '../_lib/admin-router.js'
import { send } from '../_lib/http.js'

// All /api/admin/* endpoints (login, jobs, inventory, administrators…) — see api/_lib/admin-router.js
export default async function handler(req, res) {
  const segments = new URL(req.url, 'http://localhost').pathname.replace(/^\/api\/admin\/?/, '').split('/').filter(Boolean).map(decodeURIComponent)
  try {
    return await handleAdmin(req, res, segments)
  } catch (error) {
    console.error('admin api error', error?.message)
    return send(res, error?.message === 'storage_unconfigured' ? 503 : 500, { error: error?.message === 'storage_unconfigured' ? 'Storage is not configured.' : 'Something went wrong. Please try again.' })
  }
}
