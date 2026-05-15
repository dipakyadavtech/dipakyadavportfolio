export const SITE = {
  name: 'Dipak S. Yadav',
  shortName: 'Dipak Yadav',
  role: 'Senior Software Engineer',
  focus: 'Backend · Platform · Observability Engineering',
  tagline: 'I build the platforms production runs on.',
  pitch:
    'Senior platform engineer with 6+ years owning Kafka, Kubernetes and the LGTM stack across multi-tenant enterprise SaaS — turning distributed chaos into observable, cost-efficient infrastructure.',
  location: 'India',
  url: 'https://dipakyadav.dev',
  email: 'dipak.yadav.tech@gmail.com',
  phone: '+91-9665228177',
} as const;

export const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/dipakyadav28',
  email: 'mailto:dipak.yadav.tech@gmail.com',
  phone: 'tel:+919665228177',
} as const;
