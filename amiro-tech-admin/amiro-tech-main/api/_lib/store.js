import process from 'node:process'
import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Tiny JSON document store used by the admin features.
 *  - Production: Upstash Redis / Vercel KV (REST). Set KV_REST_API_URL + KV_REST_API_TOKEN
 *    (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
 *  - Local development: a JSON file at .data/db.json (git-ignored).
 *  - Hosted without a database: mode "none" — the public site keeps working with its built-in
 *    content and the admin login explains that storage must be connected.
 */
const kvUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const kvToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const PREFIX = 'amiro:'

export function storageMode() {
  if (kvUrl() && kvToken()) return 'kv'
  if (process.env.VERCEL) return 'none'
  return 'file'
}

async function kv(command) {
  const response = await fetch(kvUrl(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${kvToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(8000),
  })
  const result = await response.json()
  if (!response.ok || result.error) throw new Error('storage_error')
  return result.result
}

const filePath = () => path.join(process.cwd(), '.data', 'db.json')
let queue = Promise.resolve()
const locked = (task) => {
  const run = queue.then(task, task)
  queue = run.catch(() => {})
  return run
}
async function readFileDb() {
  try { return JSON.parse(await fs.readFile(filePath(), 'utf8')) } catch { return {} }
}

export async function read(key, fallback = null) {
  const mode = storageMode()
  if (mode === 'none') throw new Error('storage_unconfigured')
  if (mode === 'kv') {
    const raw = await kv(['GET', PREFIX + key])
    return raw == null ? fallback : JSON.parse(raw)
  }
  return locked(async () => (await readFileDb())[key] ?? fallback)
}

export async function write(key, value) {
  const mode = storageMode()
  if (mode === 'none') throw new Error('storage_unconfigured')
  if (mode === 'kv') { await kv(['SET', PREFIX + key, JSON.stringify(value)]); return }
  await locked(async () => {
    const db = await readFileDb()
    db[key] = value
    await fs.mkdir(path.dirname(filePath()), { recursive: true })
    const temp = `${filePath()}.tmp`
    await fs.writeFile(temp, JSON.stringify(db, null, 2))
    await fs.rename(temp, filePath())
  })
}
