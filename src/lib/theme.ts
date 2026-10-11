export type Theme = 'dark' | 'light'

export const THEME_KEY = 'nepote-theme-v2'

export const THEME_BACKGROUND: Record<Theme, string> = {
  dark: 'oklch(0.13 0.02 290)',
  light: 'oklch(0.985 0.004 285)',
}

export function loadTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the toggle still works for the visit.
  }
}

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
