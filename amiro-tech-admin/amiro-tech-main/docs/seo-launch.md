# Google indexing checklist

## Implemented

- Full HTML is generated from the existing React pages during `npm run build`; design and content are preserved. JavaScript activates the existing interactions after loading.
- Seven distinct page titles, descriptions, canonical URLs and social metadata are generated from `src/routes/seo.ts`.
- Organization and WebSite JSON-LD identifies Amiro Tech Solutions, its contact email and official social profiles. No invented reviews, address, or ratings.
- Canonicals, sitemap and robots match the live domain's existing redirect to `https://www.amirotechsolutions.com`.
- Vercel clean URLs serve the generated pages; unknown URLs use the static 404 instead of returning the homepage with status 200.
- Run `npm run build`, `npm run test:seo` and `npm run lint` before deployment.

## Owner steps after deployment

1. Add the Domain property `amirotechsolutions.com` in https://search.google.com/search-console and verify with the DNS TXT record Google provides. Do not invent a verification token.
2. Check `https://www.amirotechsolutions.com/robots.txt` and `/sitemap.xml`. Submit the sitemap URL in Search Console → Sitemaps.
3. Inspect the homepage URL, run Test Live URL, and request indexing. Repeat for Services, Products and About. Review Page indexing for specific exclusion reasons.
4. Confirm the deployment serves page-specific HTML directly at `/services`, `/products`, etc., and an unknown path returns HTTP 404. Verify the non-www redirect remains in place.
5. Use the exact business name **Amiro Tech Solutions** and the same website URL on LinkedIn and Instagram. Add the website to these profiles yourself; this change does not modify social accounts.
6. Monitor Search Console impressions and branded queries. A spelling substitution in Google alone does not establish why a site is missing. Indexing status must be checked in Search Console.

Google may take days to weeks to crawl changes; requesting indexing does not guarantee inclusion or ranking. No Search Console submission or verification has been performed by these code changes.

Sources: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl and https://developers.google.com/search/docs/appearance/site-names
