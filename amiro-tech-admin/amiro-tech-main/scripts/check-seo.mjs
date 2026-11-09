import assert from 'node:assert/strict'
import console from 'node:console'
import { readFile } from 'node:fs/promises'

const origin = 'https://www.amirotechsolutions.com'
const paths = ['', 'services', 'products', 'about', 'process', 'contact', 'careers', 'privacy-policy', 'terms-and-conditions', 'cookie-policy']
const titles = new Set()
for (const path of paths) {
  const html = await readFile(`dist/${path || 'index'}.html`, 'utf8')
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  assert(title?.includes('Amiro Tech Solutions'))
  titles.add(title)
  assert(html.includes(`rel="canonical" href="${origin}/${path}"`))
  assert(html.includes(`property="og:url" content="${origin}/${path}"`))
  assert(html.includes('content="index, follow"'))
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1)
  assert(!html.includes('<div id="root"></div>'))
  assert(!html.includes('gmail.com'))
  const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">(.*?)<\/script>/s)[1])
  assert(schema['@graph'].some(item => item['@type'] === 'WebSite'))
  assert.equal(schema['@graph'][0].email, 'info@amirotechsolutions.com')
}
assert.equal(titles.size, paths.length)
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const publicSitemap = await readFile('public/sitemap.xml', 'utf8')
for (const path of paths) {
  assert(sitemap.includes(`<loc>${origin}/${path}</loc>`))
  assert(publicSitemap.includes(`<loc>${origin}/${path}</loc>`))
}
assert((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`))
assert((await readFile('dist/404.html', 'utf8')).includes('content="noindex, follow"'))
console.log(`SEO checks passed: ${paths.length} rendered pages, unique titles, canonical URLs, schema, sitemap, robots and noindex 404.`)
