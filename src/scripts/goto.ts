// In-card license links. Nested anchors are invalid HTML, so these are
// spans with role="link" and delegated navigation.
const goto = (e: Event) => {
  const el = (e.target as Element).closest?.('[data-goto]')
  if (!(el instanceof HTMLElement) || !el.dataset.goto) return
  e.preventDefault()
  e.stopPropagation()
  window.location.href = el.dataset.goto
}

document.addEventListener('click', goto)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goto(e)
})
