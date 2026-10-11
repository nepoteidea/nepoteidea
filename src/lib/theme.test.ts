import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadTheme, prefersReducedMotion, saveTheme, THEME_KEY } from './theme'

afterEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('theme storage', () => {
  it('defaults to dark and round-trips a saved choice', () => {
    expect(loadTheme()).toBe('dark')
    saveTheme('light')
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
    expect(loadTheme()).toBe('light')
  })

  it('falls back to dark and keeps working when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(loadTheme()).toBe('dark')
    expect(() => saveTheme('light')).not.toThrow()
  })
})

describe('prefersReducedMotion', () => {
  it('reads the media query when matchMedia exists', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce') }))
    expect(prefersReducedMotion()).toBe(true)
  })

  it('is false when matchMedia is missing', () => {
    vi.stubGlobal('matchMedia', undefined)
    expect(prefersReducedMotion()).toBe(false)
  })
})
