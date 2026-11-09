import assert from 'node:assert/strict'
import console from 'node:console'
import process from 'node:process'
import handler from '../api/contact.js'

const body = { name: 'Test', company: '', email: 'test@example.com', phone: '', requirementType: 'Early Access', productInterest: 'Voice AI Agent', message: 'Test enquiry', website: '' }
async function call(overrides = {}) {
  const res = { setHeader() {}, status(code) { this.code = code; return this }, json(data) { this.data = data; return this } }
  await handler({ method: 'POST', headers: { origin: 'https://www.amirotechsolutions.com', 'content-type': 'application/json' }, body, ...overrides }, res)
  return res
}
assert.equal((await call({ method: 'GET' })).code, 405)
assert.equal((await call({ headers: { origin: 'https://other.example' } })).code, 403)
assert.equal((await call({ body: { ...body, email: 'invalid' } })).code, 400)
assert.equal((await call({ body: { ...body, website: 'bot' } })).code, 400)
assert.equal((await call({ body: { ...body, message: 'x'.repeat(5001) } })).code, 400)
process.env.VITE_CONTACT_DIRECT = 'false'
assert.equal((await call()).code, 503)
process.env.VITE_CONTACT_DIRECT = 'true'
process.env.RESEND_API_KEY = 'test-only'
process.env.CONTACT_FROM = 'test@example.com'
globalThis.fetch = async (_url, options) => {
  const sent = JSON.parse(options.body)
  assert.deepEqual(sent.to, ['info@amirotechsolutions.com'])
  assert.equal(sent.reply_to, body.email)
  return { ok: true, json: async () => ({ id: 'mock' }) }
}
assert.equal((await call()).data.accepted, true)
globalThis.fetch = async () => ({ ok: false, json: async () => ({ error: 'mock' }) })
assert.equal((await call()).code, 502)
globalThis.fetch = async () => { throw new Error('mock timeout') }
assert.equal((await call()).code, 502)
console.log('Contact endpoint checks passed; no email sent.')
