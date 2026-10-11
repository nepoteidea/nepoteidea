import { render, screen } from '@testing-library/svelte'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Terminal from './Terminal.svelte'

afterEach(() => vi.useRealTimers())

describe('Terminal', () => {
  it('types the whole script out over time', async () => {
    vi.useFakeTimers()
    const { container } = render(Terminal, { motion: true })
    expect(screen.queryByText('sebastian nepote')).not.toBeInTheDocument()

    await vi.advanceTimersByTimeAsync(10_000)
    expect(screen.getByText('sebastian nepote')).toBeInTheDocument()
    expect(screen.getByText('Chief Technology Officer')).toHaveClass('t-accent')
    // Only the idle prompt at the end keeps a cursor.
    expect(container.querySelectorAll('.cursor')).toHaveLength(1)
  })

  it('shows the finished transcript straight away without motion', async () => {
    render(Terminal, { motion: false })
    expect(await screen.findByText('24 yrs · building teams that ship')).toBeInTheDocument()
    expect(screen.getByText('whoami')).toHaveClass('t-cmd')
  })
})
