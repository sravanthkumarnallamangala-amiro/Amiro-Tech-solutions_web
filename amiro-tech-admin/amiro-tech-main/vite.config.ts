import { existsSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { fileURLToPath, pathToFileURL, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves the Vercel-style functions in /api during `npm run dev` and `npm run preview`,
 * so the admin login and job posting work locally exactly as they do when deployed.
 */
function amiroApi(): Plugin {
  type ApiRequest = IncomingMessage & { body?: unknown; query?: Record<string, string> }
  type ApiResponse = ServerResponse & { status?: (code: number) => ApiResponse; json?: (body: unknown) => void }
  let load: (file: string) => Promise<{ default: (req: ApiRequest, res: ApiResponse) => unknown }>

  const resolveFile = (pathname: string) => {
    const route = pathname.replace(/^\/api\//, '').replace(/\/+$/, '')
    const candidates = route.startsWith('admin') ? ['api/admin/[...path].js'] : [`api/${route}.js`]
    return candidates.map((file) => fileURLToPath(new URL(`./${file}`, import.meta.url))).find((file) => existsSync(file))
  }

  const middleware = async (req: ApiRequest, res: ApiResponse, next: () => void) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    if (!url.pathname.startsWith('/api/')) return next()
    const file = resolveFile(url.pathname)
    if (!file) { res.statusCode = 404; res.setHeader('Content-Type', 'application/json'); return res.end('{"error":"Not found"}') }
    res.status = (code) => { res.statusCode = code; return res }
    res.json = (body) => { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(body)) }
    req.query = Object.fromEntries(url.searchParams)
    const chunks: Buffer[] = []
    for await (const chunk of req) chunks.push(chunk as Buffer)
    const raw = Buffer.concat(chunks).toString()
    if (raw && req.headers['content-type']?.startsWith('application/json')) { try { req.body = JSON.parse(raw) } catch { req.body = undefined } } else req.body = raw || undefined
    try {
      const module = await load(file)
      await module.default(req, res)
    } catch (error) {
      console.error('[api]', error)
      if (!res.writableEnded) { res.statusCode = 500; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"Server error"}') }
    }
  }

  return {
    name: 'amiro-api',
    config(_, { mode }) {
      // Make .env / .env.local values (ADMIN_EMAIL, SESSION_SECRET, KV_*) visible to the API functions.
      const env = loadEnv(mode, process.cwd(), '')
      for (const [key, value] of Object.entries(env)) if (process.env[key] === undefined) process.env[key] = value
    },
    configureServer(server) {
      load = (file) => server.ssrLoadModule(file) as never
      server.middlewares.use(middleware as never)
      server.httpServer?.once('listening', () => {
        if (!process.env.ADMIN_EMAIL) console.log('\n  Admin (development defaults): admin@amirotech.local / Admin@12345  →  /admin/login\n')
      })
    },
    configurePreviewServer(server) {
      load = (file) => import(`${pathToFileURL(file).href}`)
      server.middlewares.use(middleware as never)
    },
  }
}

export default defineConfig({
  plugins: [react(), amiroApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
