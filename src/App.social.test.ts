import { render, screen } from '@testing-library/svelte'
import { describe, expect, it, vi } from 'vitest'
import App from './App.svelte'

vi.mock('./lib/content', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./lib/content')>()),
  SOCIAL_LINKS: [
    { label: 'github', href: 'https://github.com/example' },
    { label: 'linkedin', href: '' },
  ],
}))

describe('App social links', () => {
  it('shows only the social links that have a URL', () => {
    render(App)
    expect(screen.getByRole('link', { name: 'github' })).toHaveAttribute('href', 'https://github.com/example')
    expect(screen.queryByRole('link', { name: 'linkedin' })).not.toBeInTheDocument()
  })
})
