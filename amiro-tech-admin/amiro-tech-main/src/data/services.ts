export type ServiceItem = {
  accent?: 'gold' | 'cyan'
  cta: string
  href: string
  outcome: string
  problem: string
  solution: string
  title: string
}

export type ServiceGroup = {
  id: string
  description: string
  services: ServiceItem[]
  title: string
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'product-platform-engineering',
    description:
      'Product and platform engineering for teams that need reliable, scalable software built around real workflows.',
    title: 'Product & Platform Engineering',
    services: [
      {
        cta: 'Discuss custom software',
        href: '/contact?type=custom-software',
        outcome: 'Better operational control, workflow fit, and long-term scalability.',
        problem: 'Off-the-shelf software does not match how the business actually operates.',
        solution:
          'Custom applications designed around internal processes, user roles, and business logic.',
        title: 'Custom Software Development',
      },
      {
        cta: 'Plan an enterprise app',
        href: '/contact?type=enterprise-application',
        outcome: 'Centralized tools that improve consistency, access, and daily execution.',
        problem: 'Teams rely on scattered tools, manual handoffs, and disconnected records.',
        solution:
          'Secure enterprise web applications for operations, reporting, approvals, and collaboration.',
        title: 'Enterprise Web Applications',
      },
      {
        cta: 'Explore SaaS development',
        href: '/contact?type=saas-platform',
        outcome: 'A scalable product foundation ready for users, growth, and iteration.',
        problem: 'A product idea needs to become a dependable platform, not just a prototype.',
        solution:
          'SaaS products with clean architecture, user flows, dashboards, and admin systems.',
        title: 'SaaS Product Development',
      },
      {
        cta: 'Modernize infrastructure',
        href: '/contact?type=cloud-infrastructure',
        outcome: 'Resilient, automated cloud infrastructure designed for uptime and growth.',
        problem: 'Hosting, environments, and deployments lack stability, scaling, or automation.',
        solution:
          'Cloud infrastructure, DevOps pipelines, containerization, and modern architecture.',
        title: 'Cloud & DevOps Architecture',
      },
    ],
  },
  {
    id: 'intelligence-automation',
    description:
      'AI, Voice AI, document intelligence, and automation systems that reduce manual work and improve response speed.',
    title: 'Intelligence & Automation',
    services: [
      {
        accent: 'cyan',
        cta: 'Explore Generative AI',
        href: '/contact?type=ai-solution',
        outcome: 'Faster knowledge access, contextual team copilots, and instant answers with zero hallucinations.',
        problem: 'Internal knowledge and operating procedures remain scattered across docs, wikis, and chats.',
        solution:
          'Custom RAG (Retrieval-Augmented Generation) assistants, semantic search, and enterprise AI tools trained on your private data.',
        title: 'Generative AI & Knowledge Systems',
      },
      {
        accent: 'cyan',
        cta: 'Improve call handling',
        href: '/contact?type=voice-ai',
        outcome: '24/7 call availability, zero customer hold times, and lower pressure on frontline teams.',
        problem: 'High call volumes, repetitive inquiries, and after-hours calls overwhelm staff and cost leads.',
        solution:
          'Voice agents for customer support, appointment booking, triage, and lead qualification, with handoff to a person when needed.',
        title: 'Voice Call Handling & Support',
      },
      {
        accent: 'cyan',
        cta: 'Automate document processing',
        href: '/contact?type=document-ai',
        outcome: '99%+ field extraction accuracy, near-instant document turnaround, and zero manual data entry.',
        problem: 'Manual data entry from invoices, compliance reports, inspection certificates, and forms is slow and error-prone.',
        solution:
          'AI-powered document extraction pipelines, advanced OCR, layout parsing, and automated validation rules with human-in-the-loop review.',
        title: 'Intelligent Document Processing (IDP)',
      },
      {
        cta: 'Automate a workflow',
        href: '/contact?type=automation',
        outcome: 'Lower manual effort, fewer errors, and faster operational cycles across tools.',
        problem: 'Repetitive manual handoffs between separate software tools slow down operations and create mistakes.',
        solution:
          'End-to-end automation flows for approvals, notifications, data movement, task routing, and operational schedules.',
        title: 'Business Process Automation',
      },
    ],
  },
  {
    id: 'integration-insight',
    description:
      'Integration and insight systems that connect tools, expose data, and support better decisions.',
    title: 'Integration & Insight',
    services: [
      {
        cta: 'Connect business systems',
        href: '/contact?type=system-integration',
        outcome: 'Cleaner data flow and fewer gaps between teams, tools, and processes.',
        problem: 'Important systems do not communicate, forcing teams to duplicate work.',
        solution:
          'API integrations, webhooks, data syncs, and system connections across platforms.',
        title: 'API & System Integrations',
      },
      {
        cta: 'Create better visibility',
        href: '/contact?type=dashboard-reporting',
        outcome: 'Clearer reporting, faster decisions, and better operational awareness.',
        problem: 'Leaders lack real-time visibility into performance, work, or operational status.',
        solution:
          'Dashboards, reporting tools, KPI views, and data interfaces tailored to business needs.',
        title: 'Dashboards & Reporting',
      },
      {
        cta: 'Modernize operations',
        href: '/contact?type=digital-transformation',
        outcome: 'More mature digital operations that can scale with the business.',
        problem: 'Legacy processes and disconnected tools limit growth and adaptability.',
        solution:
          'Practical transformation planning and implementation across software, data, and workflows.',
        title: 'Digital Transformation',
      },
      {
        cta: 'Connect data pipelines',
        href: '/contact?type=data-engineering',
        outcome: 'Unified datasets, automated syncs, and clear data pipelines ready for analysis.',
        problem: 'Data is siloed across separate tools and databases with no unified pipeline.',
        solution:
          'Data engineering, automated ETL syncs, warehouse modeling, and analytics pipelines.',
        title: 'Data Engineering & Pipelines',
      },
    ],
  },
]
