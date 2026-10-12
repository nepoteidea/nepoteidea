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

export interface Project {
  name: string
  blurb: string
  /** Screenshot under `public/`, served from the site root. */
  image: string
  url: string
  /** Omitted for projects whose source isn't public. */
  repo?: string
  stack: string[]
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

export const PROJECTS: Project[] = [
  {
    name: 'asado-today',
    blurb: 'Helps a group of friends decide whether today is a good day for an asado, based on the local weather forecast.',
    image: '/images/projects/asado-today.png',
    url: 'https://asado-today.nepoteidea.com/',
    repo: 'https://github.com/snepote/asado-today',
    stack: ['SvelteKit', 'Tailwind', 'Cloudflare D1'],
  },
  {
    name: 'tic-tac-toe',
    blurb: 'Two players, one device, first to three in a row wins — with a running scoreboard and a full test suite.',
    image: '/images/projects/tic-tac-toe.png',
    url: 'https://tic-tac-toe.nepoteidea.com/',
    repo: 'https://github.com/nepoteidea/tic-tac-toe',
    stack: ['Svelte', 'TypeScript', 'Vitest'],
  },
  {
    name: 'red-crab',
    blurb: 'A Chrome-dino-style endless runner: a crowned crab jumping over rocks, coral and the odd llama on the ocean floor.',
    image: '/images/projects/red-crab.png',
    url: 'https://red-crab.nepoteidea.com/',
    repo: 'https://github.com/nepoteidea/red-crab',
    stack: ['JavaScript', 'Canvas', 'Playwright'],
  },
]

export const CONTACT_EMAIL = 'hello@nepoteidea.com'

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'github', href: '' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/snepote/' },
  { label: 'x / twitter', href: '' },
]
