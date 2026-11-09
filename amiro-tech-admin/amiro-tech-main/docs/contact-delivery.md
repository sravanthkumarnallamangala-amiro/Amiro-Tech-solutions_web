# Contact delivery setup

Email drafts remain the default. Direct delivery is opt-in and requires a Vercel serverless deployment; Vite preview and static hosting do not run `api/contact.js`.

1. Approve Resend as the delivery provider and verify your sending domain in its dashboard. See https://resend.com/docs/api-reference/emails/send-email.
2. In the hosting environment, set server-only `RESEND_API_KEY` and `CONTACT_FROM` (a verified sender). Never prefix secrets with `VITE_` or commit them.
3. Configure a hosting firewall rate-limit rule for POST `/api/contact` before enabling the form. Origin checking and a honeypot alone are not sufficient bot protection.
4. Set public build variable `VITE_CONTACT_DIRECT=true`, then rebuild and deploy. Without it the existing email-draft workflow is retained.
5. Test a real enquiry on the production domain, confirm provider acceptance AND receipt in the company inbox, then reply to check Reply-To. No real email was sent during implementation tests.
6. Check failed submissions preserve details. Provider acceptance is not guaranteed inbox delivery. Monitor provider bounces/errors. To roll back, remove `VITE_CONTACT_DIRECT` and rebuild.

Only the two official domain origins are allowed. Preview origins require review before adding. Recipient is fixed server-side. Configure provider spend limits/alerts. The inline enquiry notice explains this form, not a complete legal privacy policy; have the company review its privacy obligations and provider data handling before activation.
