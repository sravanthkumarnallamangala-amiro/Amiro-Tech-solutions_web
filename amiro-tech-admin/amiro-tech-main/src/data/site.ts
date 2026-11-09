import type { IconName } from '../components/common';

/*
 * Single source of truth for content reused across pages.
 * Audit note: every claim here is qualitative or verifiable. Do not add numeric
 * performance claims (accuracy %, project counts, uptime) unless the evidence is on file.
 */

export const products = [
  {
    id: 'ims',
    category: 'Inventory & Compliance',
    cta: 'Request a demo',
    description:
      'Inventory, calibration, compliance and audit management built for NDT laboratories — designed to improve traceability, audit readiness and operational visibility.',
    features: ['Inventory tracking', 'Calibration tracking', 'Equipment lifecycle', 'Compliance visibility', 'Audit readiness', 'Dashboards & reports'],
    href: '/contact?type=product-demo&product=ims',
    icon: 'database' as IconName,
    status: 'Available' as const,
    title: 'Inventory Management System for NDT Labs',
  },
  {
    id: 'hr',
    category: 'People Operations',
    cta: 'Request a demo',
    description:
      'An HR platform for small and medium businesses to manage employee records, attendance, leave, onboarding and HR documents.',
    features: ['Employee records', 'Attendance', 'Leave management', 'Onboarding', 'HR documents', 'Reports'],
    href: '/contact?type=waitlist&product=hr',
    icon: 'users' as IconName,
    status: 'In development' as const,
    title: 'HR Management System',
  },
  {
    id: 'voice-ai',
    category: 'Conversational AI',
    cta: 'Request a demo',
    description:
      'Voice agents that answer customer calls, qualify leads, schedule appointments and hand off to your team when a person is needed.',
    features: ['AI receptionist', 'Appointment booking', 'Lead qualification', 'Customer support', 'Voice workflows', 'CRM integration'],
    href: '/contact?type=early-access&product=voice-ai',
    icon: 'voice' as IconName,
    status: 'In development' as const,
    title: 'Voice AI Agent Platform',
  },
  {
    id: 'business-ops',
    category: 'Business Operations',
    cta: 'Request a demo',
    description:
      'One workspace for CRM, tasks, approvals, documents, dashboards and workflow automation for growing companies.',
    features: ['CRM', 'Tasks', 'Approvals', 'Dashboards', 'Documents', 'Automation'],
    href: '/contact?type=product-enquiry&product=business-ops',
    icon: 'flow' as IconName,
    status: 'In development' as const,
    title: 'Business Operations Platform',
  },
]

export const deliverySteps = [
  {
    title: 'Discover',
    summary: 'Understand the business problem, users, workflow and success criteria.',
    detail: 'Stakeholder workshops, current-process review and agreement on what success looks like before any build decision.',
    outputs: ['Requirements summary', 'Scope & priorities', 'Success criteria'],
  },
  {
    title: 'Design & Build',
    summary: 'Define solution architecture, user flows, and develop in focused review cycles.',
    detail: 'User flows, interface design, and solution architecture with iterative software development and regular scheduled build reviews.',
    outputs: ['User flows & wireframes', 'Solution architecture', 'Working increments', 'Build reviews'],
  },
  {
    title: 'Test & launch',
    summary: 'Validate business-critical workflows, then deploy and hand over.',
    detail: 'Functional, regression and acceptance testing against agreed criteria, followed by deployment, user training and handover.',
    outputs: ['Test cases & results', 'User acceptance', 'Handover & training'],
  },
  {
    title: 'Support & improve',
    summary: 'Monitor, support and evolve the system as the business grows.',
    detail: 'Post-launch support, monitoring and a prioritised backlog of improvements based on real usage.',
    outputs: ['Ongoing support', 'Monitoring', 'Improvement backlog'],
  },
]

export const governance: { icon: IconName; title: string; text: string }[] = [
  { icon: 'doc', title: 'Documented scope', text: 'Requirements, priorities and acceptance criteria are written down and agreed before build.' },
  { icon: 'review', title: 'Scheduled reviews', text: 'Regular build reviews keep you close to progress and decisions throughout delivery.' },
  { icon: 'shield', title: 'Tested before release', text: 'Business-critical workflows are tested against agreed criteria before go-live.' },
  { icon: 'users', title: 'Clear handover', text: 'Training and handover so your team can operate the system with confidence.' },
]

export const technology: { icon: IconName; title: string; items: string[] }[] = [
  { icon: 'monitor', title: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Responsive UI'] },
  { icon: 'code', title: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'REST APIs'] },
  { icon: 'sparkle', title: 'AI', items: ['Generative AI', 'RAG', 'AI agents', 'Vector databases'] },
  { icon: 'cloud', title: 'Cloud & DevOps', items: ['Microsoft Azure', 'AWS', 'Docker', 'CI/CD'] },
  { icon: 'database', title: 'Data', items: ['PostgreSQL', 'Redis', 'Reporting', 'Dashboards'] },
  { icon: 'plug', title: 'Integration', items: ['REST', 'GraphQL', 'Webhooks', 'Third-party APIs'] },
]

export const caseStudy = {
  client: '',
  title: 'Inventory & compliance platform for an NDT laboratory',
  summary:
    'A unified platform that replaced manual records with traceable inventory, calibration and compliance data — making audit preparation part of day-to-day work.',
  meta: [
    { label: 'Industry', value: 'Laboratory / NDT' },
    { label: 'Solution', value: 'Custom web platform' },
    { label: 'Our role', value: 'End-to-end delivery' },
    { label: 'Stack', value: 'React · FastAPI · PostgreSQL' },
  ],
  problem:
    'Inventory, calibration and compliance information was spread across manual records and disconnected processes, making it slow to answer audit questions.',
  solution:
    'A custom platform for inventory visibility, calibration tracking, traceability, compliance review and audit preparation, with role-appropriate dashboards.',
  outcome:
    'Centralised records, clearer operational control and audit readiness that is easier to maintain — evidence is captured as work happens.',
  outcomes: ['Centralised, traceable records', 'Real-time inventory visibility', 'Audit-ready reporting', 'Less manual record-keeping'],
  lessons: [
    'Inventory systems must match real laboratory workflows.',
    'Compliance visibility works best when audit data is captured by default.',
    'Operational dashboards should make exceptions easy to find.',
  ],
  roadmap: ['Predictive stock alerts', 'Role-based approval flows', 'Advanced audit analytics', 'Equipment lifecycle tracking'],
}
