# Amiro Tech Solutions Website

A production-ready foundation for a premium software and AI solutions website built with Vite, React, and TypeScript.

## Project structure

- src/app: application entry points and top-level app composition
- src/components: reusable UI components
- src/data: structured website content
- src/pages: page-level route components
- src/routes: route selection and metadata handling
- src/styles: global theme and base styles

## Scripts

- npm run dev: start the Vite development server
- npm run build: build the production bundle
- npm run lint: run ESLint
- npm run test:seo: validate prerendered pages, metadata, structured data and sitemap
- npm run format: format the codebase with Prettier

## Local text chat

The website can generate text replies locally with Ollama; Piper is not used. On Windows,
install Ollama from [ollama.com/download](https://ollama.com/download), then run:

```powershell
ollama pull qwen2.5:1.5b
npm run dev
```

`.env` is configured for this local model. The `/api/chat` endpoint uses the same-origin
Ollama server and reports AI as available only when that model is installed. On deployment,
`OLLAMA_URL` must be reachable by the serverless API; `127.0.0.1` refers to the deployment
machine and will not use a model running on a visitor's computer. For full deployment
instructions, configure an accessible model service or use the optional Anthropic provider
with a server-side `ANTHROPIC_API_KEY`. Without an AI provider, the chat falls back to local
Amiro knowledge answers.

## UI v2.1

- Design system: `src/styles/site.css` (dark theme, motion layer, chat styles)
- Shared content: `src/data/site.ts`, `src/data/services.ts`
- AI chat assistant: `src/components/chat/ChatAssistant.tsx`, knowledge in `src/data/company-knowledge.js`, API in `api/chat.js`
- Full change log and setup: `docs/UI-REDESIGN-v2.md`


## Admin console
Jobs and admin logins are managed at `/admin`. See [docs/admin-setup.md](docs/admin-setup.md) for local and Vercel setup.
