import { afterEach, describe, expect, it, vi } from 'vitest'
import { reveal } from './reveal'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function mountReveal(delay?: number) {
  const node = document.createElement('div')
  const action = reveal(node, delay)
  return { node, destroy: () => action?.destroy?.() }
}

describe('reveal', () => {
  it('shows the element when it scrolls into view', () => {
    let callback: IntersectionObserverCallback = () => {}
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          callback = cb
        }
        observe() {}
        disconnect = disconnect
      },
    )
    const { node, destroy } = mountReveal(120)
    expect(node.classList.contains('reveal')).toBe(true)
    expect(node.style.transitionDelay).toBe('120ms')
    expect(node.classList.contains('is-in')).toBe(false)

    callback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver)
    expect(node.classList.contains('is-in')).toBe(false)
    callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    expect(node.classList.contains('is-in')).toBe(true)
    expect(disconnect).toHaveBeenCalled()
    destroy()
  })

  it('shows the element after a failsafe delay even if it never intersects', () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    )
    const { node } = mountReveal()
    expect(node.style.transitionDelay).toBe('')
    vi.advanceTimersByTime(1500)
    expect(node.classList.contains('is-in')).toBe(true)
  })

  it('shows the element immediately without IntersectionObserver support', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { node, destroy } = mountReveal()
    expect(node.classList.contains('is-in')).toBe(true)
    destroy()
  })
})
