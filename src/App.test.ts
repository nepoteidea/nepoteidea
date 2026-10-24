import { render, screen, within } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.svelte'
import { CAREER, GAMES, PROJECTS, STRENGTHS } from './lib/content'
import { THEME_KEY } from './lib/theme'

afterEach(() => localStorage.clear())

describe('App', () => {
  it('renders the hero, strengths, career, about and contact sections', () => {
    render(App)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I help teams ship great software.')
    for (const s of STRENGTHS) expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Behind the domain' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Sebastian Nepote' })).toHaveAttribute('src', '/images/avatar.jpg')
    expect(screen.getByRole('link', { name: 'linkedin' })).toHaveAttribute('href', 'https://www.linkedin.com/in/snepote/')
    expect(screen.getByRole('link', { name: /hello@nepoteidea\.com/ })).toHaveAttribute(
      'href',
      'mailto:hello@nepoteidea.com',
    )
  })

  it('lists every role on the career timeline, newest first', () => {
    render(App)
    const timeline = screen.getByRole('list')
    const items = within(timeline).getAllByRole('listitem')
    expect(items).toHaveLength(CAREER.length)
    expect(items[0]).toHaveTextContent('Co-Founder & CTO')
    expect(items[0]).toHaveTextContent('Consultport · Full-time')
    expect(items.at(-1)).toHaveTextContent('Software Engineer')
  })

  it('shows each project and game with a screenshot, live app link and GitHub link', () => {
    render(App)
    for (const p of [...PROJECTS, ...GAMES]) {
      const card = screen.getByRole('heading', { name: p.name }).closest('article')!
      expect(within(card).getByRole('img', { name: `Screenshot of ${p.name}` })).toHaveAttribute('src', p.image)
      expect(within(card).getByRole('link', { name: `Open ${p.name}` })).toHaveAttribute('href', p.url)
      expect(within(card).getByRole('link', { name: `${p.name} on GitHub` })).toHaveAttribute('href', p.repo)
    }
  })

  it('lists the games in their own subsection under Projects', () => {
    render(App)
    const games = screen.getByRole('heading', { level: 3, name: 'Games' })
    expect(document.querySelector('#projects')).toContainElement(games)
    expect(screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent)).toEqual(GAMES.map((g) => g.name))
    expect(GAMES.map((g) => g.name)).toEqual(['cheetah-on', 'red-crab', 'tic-tac-toe'])
  })

  it('links the nav to each section', () => {
    render(App)
    const nav = screen.getByRole('navigation')
    for (const [name, href] of [
      ['What I do', '#do'],
      ['Career', '#career'],
      ['Projects', '#projects'],
      ['About', '#about'],
      ['Contact', '#contact'],
    ]) {
      expect(within(nav).getByRole('link', { name })).toHaveAttribute('href', href)
      expect(document.querySelector(href)).not.toBeNull()
    }
  })

  it('starts dark and toggles to light, remembering the choice', async () => {
    const { container } = render(App)
    const site = container.querySelector('.site')!
    expect(site).toHaveAttribute('data-theme', 'dark')

    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(site).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
    expect(document.body.style.background).toContain('0.985')

    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(site).toHaveAttribute('data-theme', 'dark')
  })

  it('restores a saved light theme', () => {
    localStorage.setItem(THEME_KEY, 'light')
    const { container } = render(App)
    expect(container.querySelector('.site')).toHaveAttribute('data-theme', 'light')
  })
})
