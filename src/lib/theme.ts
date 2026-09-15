import { createSignal } from 'solid-js'
import { SITE } from '../config/site'

export type Theme = 'light' | 'dark'

const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

const [theme, setTheme] = createSignal<Theme>(read())

export function useTheme() {
  return theme
}

export function toggleTheme() {
  const next: Theme = theme() === 'dark' ? 'light' : 'dark'
  setTheme(next)
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(SITE.themeKey, next)
  } catch {
    // storage unavailable, the theme still applies for this session
  }
}
