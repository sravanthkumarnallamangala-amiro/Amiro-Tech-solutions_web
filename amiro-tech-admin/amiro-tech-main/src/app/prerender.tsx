import { renderToString } from 'react-dom/server'
import { AppRoutes } from '../routes/AppRoutes'
export { pageSeo, siteUrl, structuredData } from '../routes/seo'
export function render(pathname: string) {
  return renderToString(<AppRoutes pathname={pathname} />)
}
