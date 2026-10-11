export interface Strength {
  idx: string
  title: string
  body: string
}

export interface Job {
  range: string
  dur: string
  role: string
  company: string
  type?: string
  loc: string
  skills?: string[]
}

export interface SocialLink {
  label: string
  /** Links without a URL yet are hidden rather than rendered as dead `#` links. */
  href: string
}

export const STRENGTHS: Strength[] = [
  {
    idx: '01',
    title: 'Build & scale teams',
    body: 'Hiring, structuring and growing engineering and product teams that stay fast as the company grows.',
  },
  {
    idx: '02',
    title: 'Bridge product & tech',
    body: 'Translating business goals into technical strategy — and keeping both sides speaking the same language.',
  },
  {
    idx: '03',
    title: 'Ship, pragmatically',
    body: 'Two decades of Rails, React and everything around them. I optimise for shipping value, not for perfection.',
  },
]

export const CAREER: Job[] = [
  {
    range: '2022 — Now',
    dur: '4 yrs 3 mos',
    role: 'Co-Founder & CTO',
    company: 'Consultport',
    type: 'Full-time',
    loc: 'Berlin, Germany · Hybrid',
    skills: ['Ruby on Rails', 'Scrum', '+19 skills'],
  },
  {
    range: '2014 — 2022',
    dur: '7 yrs 6 mos',
    role: 'CTO',
    company: 'Helpling',
    loc: 'Berlin Metropolitan Area',
    skills: ['Ruby on Rails', 'React.js', '+24 skills'],
  },
  {
    range: '2012 — 2014',
    dur: '2 yrs',
    role: 'IT Team Lead',
    company: 'Tirendo Holding GmbH',
    type: 'Full-time',
    loc: 'Berlin, Germany',
    skills: ['Scrum', 'Team Leadership', '+20 skills'],
  },
  {
    range: '2009 — 2012',
    dur: '3 yrs 6 mos',
    role: 'Project CTO',
    company: 'Grupo Intercom',
    loc: 'Greater Barcelona Metropolitan Area',
  },
  {
    range: '2007 — 2009',
    dur: '1 yr 3 mos',
    role: 'Senior Software Engineer',
    company: 'La Casa Amarilla / NGO',
    type: 'Freelance',
    loc: 'Barcelona, Catalonia, Spain',
    skills: ['SEO', 'PHP', '+5 skills'],
  },
  {
    range: '2004 — 2007',
    dur: '3 yrs 1 mo',
    role: 'CTO',
    company: 'Antay Mobile Solutions',
    type: 'Full-time',
    loc: 'Barcelona, Catalonia, Spain',
    skills: ['Team Leadership', 'C#', '+6 skills'],
  },
  {
    range: '2003 — 2004',
    dur: '1 yr 4 mos',
    role: 'IT Project Manager',
    company: 'Anuntis Segundamano',
    type: 'Full-time',
    loc: 'Sant Cugat del Vallès, Spain',
    skills: ['.NET Framework', 'Mobile Apps'],
  },
  {
    range: '2002 — 2003',
    dur: '1 yr 2 mos',
    role: 'Software Engineer',
    company: 'Anuntis Segundamano',
    type: 'Full-time',
    loc: 'Sant Cugat del Vallès, Spain',
  },
]

export const CONTACT_EMAIL = 'hello@nepoteidea.com'

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'github', href: '' },
  { label: 'linkedin', href: '' },
  { label: 'x / twitter', href: '' },
]
