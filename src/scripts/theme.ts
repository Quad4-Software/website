import { SITE } from '../config/site'

type Theme = 'light' | 'dark'

for (const btn of document.querySelectorAll<HTMLElement>('[data-theme-toggle]')) {
  btn.addEventListener('click', () => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(SITE.themeKey, next)
    } catch {
      // storage unavailable, the theme still applies for this session
    }
  })
}
