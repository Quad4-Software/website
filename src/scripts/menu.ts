const menuBtn = document.querySelector<HTMLElement>('[data-menu-toggle]')
const menuPanel = document.querySelector<HTMLElement>('[data-menu-panel]')

if (menuBtn && menuPanel) {
  const iconOpen = menuBtn.querySelector<HTMLElement>('[data-icon-open]')
  const iconClose = menuBtn.querySelector<HTMLElement>('[data-icon-close]')
  const setOpen = (open: boolean) => {
    menuPanel.classList.toggle('hidden', !open)
    menuBtn.setAttribute('aria-expanded', String(open))
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    iconOpen?.classList.toggle('hidden', open)
    iconClose?.classList.toggle('hidden', !open)
  }
  menuBtn.addEventListener('click', () => setOpen(menuBtn.getAttribute('aria-expanded') !== 'true'))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false)
  })
}
