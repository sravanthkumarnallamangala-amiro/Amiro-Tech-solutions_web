// The openings that were originally hard-coded on the Careers page. Seeded once so the admin can edit, close or remove them.
const now = new Date().toISOString()
const base = { location: 'Bengaluru', workMode: 'Hybrid', status: 'published', createdAt: now, updatedAt: now, createdBy: 'system' }

export const seedJobs = [
  {
    ...base, id: 'python-developer', title: 'Python Developer', discipline: 'Backend engineering', vacancies: 2, experience: 'Up to 2 years',
    skills: ['Python', 'FastAPI', 'Azure'],
    description: 'Build the APIs and cloud services that power practical business software.',
    responsibilities: ['Develop and maintain REST APIs with Python and FastAPI.', 'Connect application services with databases and external APIs.', 'Support deployment, troubleshooting, and application monitoring on Azure.', 'Write maintainable code, add tests, and participate in code reviews.'],
    requirements: ['Up to 2 years of development experience.', 'Working knowledge of Python, FastAPI, and REST API fundamentals.', 'Familiarity with Microsoft Azure and cloud application deployment.', 'Understanding of databases, Git, debugging, and basic testing.'],
  },
  {
    ...base, id: 'full-stack-developer', title: 'Full Stack Developer', discipline: 'Product engineering', vacancies: 2, experience: 'Up to 2 years',
    skills: ['React', 'Python', 'FastAPI', 'Azure'],
    description: 'Connect thoughtful React interfaces with dependable Python services, from browser to cloud.',
    responsibilities: ['Build responsive, accessible interfaces using React.', 'Develop Python and FastAPI services and connect them to the frontend.', 'Work with databases, API integrations, and Azure deployments.', 'Test and troubleshoot features across the application stack.'],
    requirements: ['Up to 2 years of development experience.', 'Working knowledge of React, JavaScript, HTML, and CSS.', 'Experience building APIs with Python and FastAPI.', 'Familiarity with Azure, databases, Git, and responsive web development.'],
  },
  {
    ...base, id: 'software-tester', title: 'Software Tester / QA', discipline: 'Quality assurance', vacancies: 1, experience: '',
    skills: ['Manual Testing', 'API Testing', 'Regression Testing'],
    description: 'Help deliver dependable software by testing web applications, validating APIs, and identifying issues before release.',
    responsibilities: ['Create and execute test cases for web applications and APIs.', 'Document defects with clear reproduction steps and verify fixes.', 'Perform functional and regression testing across releases.', 'Collaborate with developers to improve product quality.'],
    requirements: ['Understanding of software testing fundamentals and test case design.', 'Familiarity with testing web interfaces and REST APIs.', 'Attention to detail and clear communication when reporting defects.'],
  },
]
