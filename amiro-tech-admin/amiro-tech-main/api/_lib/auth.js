import process from 'node:process'
import crypto from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(crypto.scrypt)
const SESSION_HOURS = 8
export const COOKIE = 'amiro_admin'

export const isProduction = () => Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production'

/** Bootstrap credentials. Development gets clearly-labelled defaults; production must configure its own. */
export function bootstrapCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (email && password) return { email, password }
  if (!isProduction()) return { email: 'admin@amirotech.local', password: 'Admin@12345', isDevDefault: true }
  return null
}

export function secret() {
  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16) return process.env.SESSION_SECRET
  if (!isProduction()) return 'amiro-dev-only-session-secret'
  return null
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = await scrypt(password, salt, 64)
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`
}

export async function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored).split('$')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const expected = Buffer.from(hash, 'base64')
  const actual = await scrypt(password, Buffer.from(salt, 'base64'), expected.length)
  return crypto.timingSafeEqual(actual, expected)
}

const b64 = (value) => Buffer.from(value).toString('base64url')
const mac = (data, key) => crypto.createHmac('sha256', key).update(data).digest('base64url')

export function createSession(admin) {
  const key = secret()
  const payload = b64(JSON.stringify({ sub: admin.id, exp: Date.now() + SESSION_HOURS * 3600_000 }))
  return `${payload}.${mac(payload, key)}`
}

export function readSession(req) {
  const key = secret()
  if (!key) return null
  const token = (req.headers.cookie ?? '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1)
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = mac(payload, key)
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data.exp > Date.now() ? data : null
  } catch { return null }
}

export function sessionCookie(req, token) {
  const secure = isProduction() || req.headers['x-forwarded-proto'] === 'https'
  const base = `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`
  return token ? `${base}; Max-Age=${SESSION_HOURS * 3600}` : `${base}; Max-Age=0`
}

/** Best-effort login throttle (per server instance). */
const attempts = new Map()
export function throttled(ip) {
  const now = Date.now()
  const entry = attempts.get(ip)
  return Boolean(entry && entry.resetAt > now && entry.count >= 6)
}
export function recordFailure(ip) {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || entry.resetAt <= now) attempts.set(ip, { count: 1, resetAt: now + 15 * 60_000 })
  else entry.count += 1
}
export function clearFailures(ip) { attempts.delete(ip) }
