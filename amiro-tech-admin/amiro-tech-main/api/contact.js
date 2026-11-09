import process from 'node:process'

// Configure a platform rate-limit rule for /api/contact before enabling publicly.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ accepted: false })
  }
  const origins = ['https://www.amirotechsolutions.com', 'https://amirotechsolutions.com']
  if (!origins.includes(req.headers.origin)) return res.status(403).json({ accepted: false })
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ accepted: false })
  let data
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return res.status(400).json({ accepted: false }) }
  if (!data || typeof data !== 'object' || data.website) return res.status(400).json({ accepted: false })
  const limits = { name: 150, company: 200, email: 254, phone: 50, requirementType: 100, productInterest: 100, message: 5000 }
  const fields = {}
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== 'string' || data[key].length > limit) return res.status(400).json({ accepted: false })
    fields[key] = data[key].trim()
  }
  if (!fields.name || !fields.message || !fields.requirementType || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return res.status(400).json({ accepted: false })
  if (process.env.VITE_CONTACT_DIRECT !== 'true' || !process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) return res.status(503).json({ accepted: false })
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM, to: ['info@amirotechsolutions.com'], reply_to: fields.email, subject: 'New website enquiry', text: Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join('\n\n') }),
      signal: AbortSignal.timeout(12000),
    })
    const result = await response.json()
    if (!response.ok || !result.id) return res.status(502).json({ accepted: false })
    return res.status(200).json({ accepted: true })
  } catch { return res.status(502).json({ accepted: false }) }
}
