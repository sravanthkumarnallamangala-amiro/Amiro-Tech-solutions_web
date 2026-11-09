// @ts-check
/**
 * Company knowledge for the Amiro AI chat assistant.
 * Single source of truth used by BOTH:
 *   - the browser widget (instant answers / offline fallback), and
 *   - api/chat.js (system prompt for the AI model).
 * Keep every statement factual and approved. Do not add unverified numbers.
 */

export const company = {
  name: 'Amiro Tech Solutions Pvt Ltd',
  shortName: 'Amiro Tech',
  email: 'info@amirotechsolutions.com',
  website: 'https://www.amirotechsolutions.com',
  address:
    '3rd Floor, Brigade Tech Park, Block B, Sy. Nos. 134/1, 134/2, Pattandur Agrahara, K.R. Puram Hobli, Whitefield Road, Bengaluru, Karnataka 560066, India',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Brigade%20Tech%20Park%20Block%20B%2C%20Whitefield%20Road%2C%20Bengaluru%20560066',
  linkedin: 'https://www.linkedin.com/company/amirotechsolutions',
  instagram: 'https://www.instagram.com/amirotechsolutions',
}

/** @type {{ id: string, title: string, keywords: string[], answer: string, followUps?: string[] }[]} */
export const knowledge = [
  {
    id: 'about',
    title: 'About Amiro Tech',
    keywords: [
      'about',
      'who',
      'company',
      'amiro',
      'what do you do',
      'overview',
      'introduce',
      'background',
    ],
    answer:
      '**Amiro Tech Solutions Pvt Ltd** is a Bengaluru-based software and AI company. We design, build and support custom applications, AI assistants, Voice AI agents and workflow automation for growing businesses — from discovery through to long-term support.\n\nWe work with clients in India and internationally.',
    followUps: ['What services do you offer?', 'How does a project work?'],
  },
  {
    id: 'services',
    title: 'Services',
    keywords: [
      'service',
      'services',
      'offer',
      'build',
      'develop',
      'help',
      'capabilit',
      'expertise',
      'do you do',
    ],
    answer:
      'We work across three practices:\n\n• **Product & Platform Engineering** — custom software, enterprise web applications, SaaS products, cloud & DevOps architecture\n• **Intelligence & Automation** — generative AI & knowledge systems, conversational Voice AI, intelligent document processing (IDP), business process automation\n• **Integration & Insight** — API & system integrations, dashboards & reporting, digital transformation, data engineering & pipelines\n\nSee all details on the [Services page](/services). For a recommendation based on your needs, [contact our team](/contact?type=consultation).',
    followUps: ['Tell me about Voice AI', 'What technologies do you use?'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & Knowledge Systems',
    keywords: [
      'generative ai & knowledge systems',
      'generative ai',
      'knowledge systems',
      'rag assistant',
      'semantic search',
      'company document assistant',
      'internal knowledge assistant',
      'internal documents',
      'answers from internal documents',
      'assistant that answers questions from internal documents',
    ],
    answer:
      '**Generative AI & Knowledge Systems** help teams find and use information from company documents and internal knowledge. We build retrieval-augmented generation (RAG) assistants, semantic search, and tailored AI tools using your private data.\n\nThis is best suited to questions and workflows where staff need answers grounded in internal materials. [View this service](/services#service-generative-ai-knowledge-systems) or [discuss an AI solution](/contact?type=ai-solution).',
    followUps: ['How does Voice AI work?', 'What services do you offer?'],
  },
  {
    id: 'conversational-voice-ai',
    title: 'Voice Call Handling & Support',
    keywords: [
      'voice call handling support',
      'voice call handling',
      'conversational voice ai',
      'voice ai agent',
      'voice ai',
      'voice assistant',
      'phone agent',
      'call answering',
      'automated phone calls',
      'ai receptionist',
    ],
    answer:
      '**Voice Call Handling & Support** helps manage spoken customer interactions over the phone. Voice agents can answer common questions, support appointment booking, qualify enquiries, and hand conversations to a person when needed.\n\nThis is suited to call handling and customer conversations, rather than searching a library of company documents. [View this service](/services#service-voice-call-handling-support) or [discuss call support](/contact?type=voice-ai).',
    followUps: ['How are knowledge assistants different?', 'What services do you offer?'],
  },
  {
    id: 'document-ai',
    title: 'Intelligent Document Processing',
    keywords: [
      'intelligent document processing',
      'document ai',
      'idp',
      'ocr',
      'document extraction',
      'extract data from documents',
      'process invoices',
    ],
    answer:
      '**Intelligent Document Processing (IDP)** extracts and validates information from documents such as invoices, inspection reports, and compliance certificates. Solutions can combine OCR, layout parsing, validation rules, and human review for exceptions.\n\n[View this service](/services#service-intelligent-document-processing-idp) or [discuss document AI](/contact?type=document-ai).',
    followUps: [
      'How does Business Process Automation work?',
      'What other AI services do you offer?',
    ],
  },
  {
    id: 'process-automation',
    title: 'Business Process Automation',
    keywords: [
      'business process automation',
      'workflow automation',
      'automate a workflow',
      'automate workflow',
      'automation services',
      'automate approvals',
      'automate tasks',
      'manual approvals',
      'manual data entry',
      'streamline workflow',
      'reduce manual work',
      'approvals and data entry',
      'manual approvals and data entry',
      'data entry manually',
      'manual approval process',
      'approvals workflow',
      'manual workflow',
      'streamline approvals',
    ],
    answer:
      '**Business Process Automation** connects routine steps across tools, such as approvals, notifications, data movement, and task routing. We first map the existing workflow, then identify practical automation and any human review or handoff needed.\n\n[View this service](/services#service-business-process-automation) or [discuss workflow automation](/contact?type=automation).',
    followUps: ['What is Intelligent Document Processing?', 'What services do you offer?'],
  },
  {
    id: 'ai-overview',
    title: 'AI & Automation Services',
    keywords: [
      'ai services',
      'artificial intelligence services',
      'ai and automation services',
      'ai automation',
      'ai solutions',
    ],
    answer:
      'Our AI and automation services include **Generative AI & Knowledge Systems** for document-grounded answers and search, **Voice Call Handling & Support** for phone interactions, **Intelligent Document Processing** for extracting and validating document data, and **Business Process Automation** for workflow steps across tools.\n\n[Explore the Intelligence & Automation practice](/services#intelligence-automation) or [contact our team](/contact?type=consultation) to discuss your use case.',
    followUps: [
      'Tell me about Generative AI & Knowledge Systems',
      'Tell me about Voice Call Handling & Support',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    keywords: ['automation'],
    answer:
      'We also build **Intelligent Document Processing (IDP)** to extract and validate information from documents, and **Business Process Automation** to coordinate approvals, notifications, data movement, and task routing.\n\n[Explore our services](/services#intelligence-automation) or [discuss your workflow](/contact?type=automation).',
    followUps: ['How does Generative AI work?', 'How does Voice AI work?'],
  },
  {
    id: 'ndt-inventory',
    title: 'Inventory Management System for NDT Labs',
    keywords: [
      'ndt inventory system',
      'inventory system for ndt labs',
      'ndt lab inventory',
      'equipment and calibration spreadsheets',
      'equipment and calibration in spreadsheets',
      'ndt lab tracks equipment and calibration',
      'calibration tracking',
      'calibration due dates',
      'equipment lifecycle',
      'inventory compliance system',
      'ims demo',
      'request an ims demo',
    ],
    answer:
      '**Available now:** the IMS helps NDT labs track inventory, calibration, equipment lifecycle and audit readiness. [Request a product demo](/contact?type=product-demo&product=ims).',
    followUps: [
      'Which products are available now?',
      'How does the system support audit readiness?',
    ],
  },
  {
    id: 'products',
    title: 'Products',
    keywords: [
      'product',
      'products',
      'ims',
      'inventory',
      'hr',
      'hrms',
      'platform',
      'demo',
      'waitlist',
      'early access',
      'ndt',
    ],
    answer:
      'The **Inventory Management System for NDT Labs** is available now for inventory, calibration, equipment lifecycle and audit readiness. The **HR Management System**, **Voice AI Agent Platform** and **Business Operations Platform** are in development.\n\nSee the [Products page](/products) or [request an IMS demo](/contact?type=product-demo&product=ims).',
    followUps: ['What does the NDT inventory system cover?', 'How do I request a product demo?'],
  },
  {
    id: 'hr-product',
    title: 'HR Management System',
    keywords: [
      'hr management system',
      'hr software',
      'hr platform',
      'hrms',
      'employee records',
      'employee management',
      'attendance tracking',
      'attendance management',
      'leave management',
      'leave tracking',
      'employee onboarding',
      'hr documents',
      'people operations',
    ],
    answer:
      '**In development:** the HR Management System is planned to cover employee records, attendance, leave, onboarding and HR documents. [Join the waitlist](/contact?type=waitlist&product=hr).',
    followUps: [
      'Which products are available now?',
      'What does the Business Operations Platform include?',
    ],
  },
  {
    id: 'voice-ai-product',
    title: 'Voice AI Agent Platform',
    keywords: [
      'voice ai agent platform',
      'voice ai product',
      'ai phone agent',
      'ai receptionist',
      'answer customer calls',
      'automated call answering',
      'appointment booking',
      'lead qualification',
      'customer call support',
      'voice workflows',
      'crm integration',
    ],
    answer:
      '**In development:** the Voice AI Agent Platform is designed to answer customer calls, qualify leads, schedule appointments and hand off to your team when needed. [Request early access](/contact?type=early-access&product=voice-ai).',
    followUps: [
      'How is Voice AI different from a document assistant?',
      'Which products are available now?',
    ],
  },
  {
    id: 'business-ops-product',
    title: 'Business Operations Platform',
    keywords: [
      'business operations platform',
      'business operations software',
      'operations platform',
      'crm',
      'task management',
      'approval workflows',
      'business approvals',
      'business dashboard',
      'operations dashboard',
      'document management',
      'workflow automation',
      'one workspace',
    ],
    answer:
      '**In development:** the Business Operations Platform is planned to bring CRM, tasks, approvals, documents, dashboards and automation into one workspace. [Enquire about the product](/contact?type=product-enquiry&product=business-ops).',
    followUps: ['Which products are available now?', 'What does the HR Management System include?'],
  },
  {
    id: 'integrations',
    title: 'API & System Integrations',
    keywords: [
      'integrate',
      'integration',
      'integrations',
      'connect our existing tools',
      'connect business systems',
      'existing business tools',
      'api integration',
      'api integrations',
      'keep our existing systems',
    ],
    answer:
      'Yes. Amiro builds **API and system integrations** to connect platforms, synchronise data and reduce duplicate work. The right approach depends on the tools you use and how information needs to move between them.\n\n[Discuss your integration requirements](/contact?type=system-integration) and our team can review the current workflow with you.',
    followUps: [
      'What services do you offer?',
      'What information would you need to estimate a project?',
    ],
  },
  {
    id: 'case',
    title: 'Featured client work',
    keywords: [
      'case',
      'study',
      'client',
      'clients',
      'portfolio',
      'project',
      'projects',
      'work',
      'example',
      'scientech',
      'experience',
    ],
    answer:
      'Our featured implementation is an **inventory and compliance platform**, an NDT laboratory. It replaced manual records with traceable inventory, calibration and compliance data, giving centralised records, real-time inventory visibility and audit-ready reporting.\n\nExplore it on the [Products page](/products#ims) and see our custom engineering approach on the [Services page](/services).',
    followUps: ['How does a project work?', 'What technologies do you use?'],
  },
  {
    id: 'process',
    title: 'Delivery process',
    keywords: [
      'process',
      'how',
      'work',
      'steps',
      'approach',
      'methodology',
      'timeline',
      'start',
      'phase',
      'agile',
      'deliver',
      'stakeholder',
      'review',
      'involved',
      'team involved',
      'feedback',
      'build review',
    ],
    answer:
      'We start by understanding the business problem, users, current workflow and success criteria. From there, we agree the scope and design, build in focused cycles with scheduled reviews, test key workflows against agreed criteria, and plan deployment and handover. Post-launch support and improvements can then be discussed based on your needs.\n\nYour team stays involved through review checkpoints and acceptance testing, so decisions and feedback are part of delivery. See the [Process page](/process) or [talk with our team](/contact?type=consultation).',
    followUps: ['How much does it cost?', 'How do I contact you?'],
  },
  {
    id: 'tech',
    title: 'Technology',
    keywords: [
      'tech',
      'technology',
      'technologies',
      'stack',
      'react',
      'python',
      'fastapi',
      'azure',
      'aws',
      'cloud',
      'database',
      'language',
      'framework',
    ],
    answer:
      'We use established, well-supported technologies:\n\n• **Frontend** — React, TypeScript, Next.js\n• **Backend** — Python, FastAPI, Node.js, REST APIs\n• **AI** — generative AI, RAG, AI agents, vector databases\n• **Cloud & DevOps** — Microsoft Azure, AWS, Docker, CI/CD\n• **Data** — PostgreSQL, Redis, reporting & dashboards\n• **Integration** — REST, GraphQL, webhooks',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    keywords: [
      'price',
      'pricing',
      'cost',
      'costs',
      'budget',
      'quote',
      'quotation',
      'estimate',
      'rate',
      'charges',
      'fee',
      'custom software project estimate',
      'estimate a custom software project',
      'custom software project',
      'project pricing',
    ],
    answer:
      'Pricing depends on scope, so we don’t publish fixed prices. After a short discovery conversation we share a scoped proposal with deliverables and commercial terms.\n\n[Book a consultation](/contact?type=consultation) to get an estimate for your project.',
    followUps: ['How does a project work?', 'How do I contact you?'],
  },
  {
    id: 'contact',
    title: 'Contact',
    keywords: [
      'contact',
      'email',
      'mail',
      'reach',
      'talk',
      'call',
      'phone',
      'meeting',
      'consult',
      'consultation',
      'book',
      'enquiry',
      'inquiry',
    ],
    answer:
      'You can reach us at **info@amirotechsolutions.com**, or use the [contact form](/contact) — choose your requirement and we’ll recommend a clear next step.',
    followUps: ['Where is your office?'],
  },
  {
    id: 'location',
    title: 'Office',
    keywords: [
      'where',
      'office',
      'location',
      'address',
      'located',
      'bangalore',
      'bengaluru',
      'india',
      'visit',
      'map',
    ],
    answer:
      'Our office is at **3rd Floor, Brigade Tech Park, Block B**, Whitefield Road, Bengaluru, Karnataka 560066, India. [Open in Google Maps](' +
      'https://www.google.com/maps/search/?api=1&query=Brigade%20Tech%20Park%20Block%20B%2C%20Whitefield%20Road%2C%20Bengaluru%20560066' +
      ').\n\nWe serve clients in India and internationally, in person and remotely.',
  },
  {
    id: 'careers',
    title: 'Careers',
    keywords: [
      'career',
      'careers',
      'job',
      'jobs',
      'hiring',
      'hire',
      'vacancy',
      'vacancies',
      'opening',
      'openings',
      'intern',
      'apply',
      'role',
      'resume',
    ],
    answer:
      'We’re hiring in **Bengaluru (hybrid)** — 5 vacancies across 3 roles:\n\n• **Python Developer** — 2 vacancies (Python, FastAPI, Azure)\n• **Full Stack Developer** — 2 vacancies (React, Python, FastAPI, Azure)\n• **Software Tester / QA** — 1 vacancy\n\nSee details and apply on the [Careers page](/careers).',
  },
  {
    id: 'privacy',
    title: 'Privacy',
    keywords: [
      'privacy',
      'data',
      'gdpr',
      'security',
      'confidential',
      'nda',
      'secure',
      'cookie',
      'cookies',
    ],
    answer:
      'Please don’t share passwords, payment details or confidential data in chat or forms. If your project involves sensitive material, mention it and we’ll agree a secure way to share it. See our [Privacy Policy](/privacy-policy).',
  },
]

export const suggestedQuestions = [
  'What does the NDT inventory system cover?',
  'Which products are available now?',
  'Can you connect our existing business tools?',
  'How is project pricing determined?',
  'What information would you need to estimate a project?',
]

/** System prompt for the AI model (server side). */
export function buildSystemPrompt() {
  const facts = knowledge.map((k) => `## ${k.title}\n${k.answer}`).join('\n\n')
  return [
    `You are "Amiro Assistant", the website assistant for ${company.name} (${company.website}).`,
    'Answer the visitor’s specific question in a natural, conversational way using ONLY the facts below. Do not copy a canned answer when the visitor asks for a comparison, recommendation, or explanation; synthesize the relevant facts and tailor the response to their wording. Keep replies brief (normally under 100 words), clear, friendly, and professional.',
    'For product questions, explain the relevant capabilities and clearly state whether the product is available or in development. Recommend a next step only when supported by the facts. Ask one short clarifying question when the visitor has not provided enough context to make a useful recommendation.',
    'When asked about a named service, answer with that service’s specific purpose and capabilities. Keep Generative AI & Knowledge Systems (document-grounded search and assistants) distinct from Voice Call Handling & Support (phone conversations, call handling and human handoff). Do not merge them into one answer unless the user asks for an overview.',
    'Use short paragraphs or bullet points. You may use **bold** and markdown links like [text](/path).',
    'If the answer is not in the facts, say you don’t have that detail and suggest emailing info@amirotechsolutions.com or using the contact form at /contact.',
    'Never invent numbers, prices, client names, certifications, guarantees or timelines. Do not give legal, financial or medical advice.',
    'Politely decline unrelated requests and steer back to how Amiro Tech can help.',
    'Never ask for passwords, payment details or confidential information.',
    '',
    `Company: ${company.name}. Email: ${company.email}. Address: ${company.address}.`,
    '',
    facts,
  ].join('\n')
}

const normalise = (/** @type {string} */ text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')

const stopWords = new Set([
  'about',
  'and',
  'are',
  'can',
  'does',
  'for',
  'how',
  'is',
  'it',
  'me',
  'my',
  'our',
  'request',
  'requests',
  'the',
  'to',
  'what',
  'which',
  'with',
  'you',
  'your',
])

const companyTopicTerms = [
  'amiro',
  'service',
  'services',
  'product',
  'products',
  'career',
  'careers',
  'job',
  'jobs',
  'hiring',
  'contact',
  'email',
  'pricing',
  'cost',
  'budget',
  'estimate',
  'quote',
  'quotation',
  'office',
  'address',
  'location',
  'process',
  'technology',
  'technologies',
  'tech stack',
  'stack',
  'inventory',
  'ndt',
  'ims',
  'hrms',
  'voice ai',
  'generative ai',
  'document processing',
  'automation',
  'integration',
  'integrations',
  'project pricing',
  'project estimate',
  'project cost',
  'custom software',
  'software development',
  'consultation',
  'delivery process',
  'privacy policy',
  'website',
  'who are you',
  'what do you do',
  'what does your company do',
  'what does amiro do',
]

/** @param {string} a @param {string} b */
function editDistanceAtMostOne(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++edits > 1) return false
    if (a.length > b.length) i++
    else if (b.length > a.length) j++
    else {
      i++
      j++
    }
  }
  return edits + Number(i < a.length || j < b.length) <= 1
}

/** @param {string} question @returns {{ entry: (typeof knowledge)[number], score: number }[]} */
function rankKnowledge(question) {
  const query = normalise(question).trim()
  const tokens = [
    ...new Set(query.split(/\s+/).filter((token) => token.length > 2 && !stopWords.has(token))),
  ]
  if (!tokens.length) return []

  return knowledge
    .map((entry) => {
      const keywords = entry.keywords.map((keyword) => normalise(keyword).trim()).filter(Boolean)
      const title = normalise(entry.title).split(/\s+/)
      const answer = normalise(entry.answer).split(/\s+/)
      let score = 0

      for (const keyword of keywords) {
        if (keyword.includes(' ') && query.includes(keyword))
          score += 5 + keyword.split(/\s+/).length
      }

      for (const token of tokens) {
        /** @param {string[]} candidates */
        const matches = (candidates) =>
          candidates.some(
            (candidate) =>
              candidate === token ||
              (token.length >= 5 &&
                candidate.length >= 5 &&
                editDistanceAtMostOne(token, candidate)),
          )
        if (matches(keywords.flatMap((keyword) => keyword.split(/\s+/)))) score += 3
        else if (matches(title)) score += 2.5
        else if (matches(answer)) score += 0.75
      }

      return { entry, score }
    })
    .filter(({ score }) => score >= 2.5)
    .sort((a, b) => b.score - a.score)
}

/** Whether a question is clearly about Amiro or the information on this site. */
/** @param {string} question */
export function isCompanyRelated(question) {
  const query = ` ${normalise(question).trim()} `
  if (companyTopicTerms.some((term) => query.includes(` ${term} `))) return true
  if (/\b(hi|hello|hey|namaste|thanks|thank you|thx)\b/.test(query)) return true
  return (rankKnowledge(question)[0]?.score ?? 0) >= 6
}

/** Related questions for the current search, ranked from the matching knowledge. */
/** @param {string} question */
export function relatedQuestions(question) {
  return [...new Set(rankKnowledge(question)[0]?.entry.followUps ?? [])].slice(0, 3)
}

/**
 * Instant on-device answer (used when the AI endpoint is not configured or unavailable).
 * @param {string} question
 */
export function localAnswer(question) {
  const q = ` ${normalise(question)} `
  if (
    /\b(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/.test(q) &&
    q.trim().split(/\s+/).length <= 4
  ) {
    return {
      answer:
        'Hello! 👋 I can tell you about Amiro Tech’s services, products, delivery process, careers or how to get in touch. What would you like to know?',
      followUps: suggestedQuestions.slice(0, 3),
    }
  }
  if (/\b(thank|thanks|thx)\b/.test(q)) {
    return {
      answer: 'You’re welcome! Anything else you’d like to know about Amiro Tech?',
      followUps: suggestedQuestions.slice(0, 3),
    }
  }
  if (!isCompanyRelated(question)) {
    return {
      answer:
        'I can help with Amiro Tech’s services, products, delivery process, careers or contact details. For other questions, please [contact our team](/contact) or email **info@amirotechsolutions.com**.',
      followUps: suggestedQuestions.slice(0, 3),
    }
  }
  const ranked = rankKnowledge(question)
  const best = ranked[0]
  if (best) {
    return { answer: best.entry.answer, followUps: best.entry.followUps ?? [] }
  }
  return {
    answer:
      'I don’t have that detail yet. Our team can help directly — email **info@amirotechsolutions.com** or use the [contact form](/contact).\n\nI can tell you about our services, products, process, technology, careers or office.',
    followUps: suggestedQuestions.slice(0, 3),
  }
}
