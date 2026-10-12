import { render, screen } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest'
import App from './App.svelte'

vi.mock('./lib/content', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./lib/content')>()),
  PROJECTS: [
    {
      name: 'secret-app',
      blurb: 'Closed source.',
      image: '/images/projects/secret-app.png',
      url: 'https://secret-app.example.com/',
      stack: ['Svelte'],
    },
  ],
}))

describe('App projects', () => {
  it('omits the GitHub link for projects without a public repo', () => {
    render(App)
    expect(screen.getByRole('link', { name: 'Open secret-app' })).toHaveAttribute('href', 'https://secret-app.example.com/')
    expect(screen.queryByRole('link', { name: /on GitHub/ })).not.toBeInTheDocument()
  })
})
