import { readFile, writeFile } from 'node:fs/promises'
import console from 'node:console'
import { createServer } from 'vite'

// Render the actual React pages, identical for visitors and crawlers.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
try {
  const { render, pageSeo, siteUrl, structuredData } = await server.ssrLoadModule('/src/app/prerender.tsx')
  const template = await readFile('dist/index.html', 'utf8')
  for (const page of [...pageSeo, { path: '/404', title: 'Page Not Found | Amiro Tech Solutions', description: 'The requested page could not be found.' }]) {
    let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(/<div id="root"><\/div>/, () => `<div id="root">${render(page.path)}</div>`)
    for (const [key, value] of Object.entries({ description: page.description, 'og:title': page.title, 'og:description': page.description, 'og:url': siteUrl + page.path, 'twitter:title': page.title, 'twitter:description': page.description })) {
      html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("\\s*/?>)`), (_, before, after) => before + escape(value) + after)
    }
    html = html.replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${siteUrl}${page.path}$2`)
      .replace('</head>', `<script id="site-schema" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>\n</head>`)
    if (page.path === '/404') html = html.replace('content="index, follow"', 'content="noindex, follow"')
    await writeFile(`dist/${page.path === '/' ? 'index' : page.path.slice(1)}.html`, html)
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pageSeo.map(page => `  <url><loc>${siteUrl}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
  await writeFile('dist/admin.html', template.replace(/<title>.*?<\/title>/, '<title>Admin | Amiro Tech Solutions</title>').replace('content="index, follow"', 'content="noindex, nofollow"'))
  console.log(`Prerendered ${pageSeo.length} pages and a 404 page with metadata and structured data.`)
} finally {
  await server.close()
}
