// Projects page search and filter.
const search = document.querySelector<HTMLInputElement>('[data-project-search]')

if (search) {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-search]'))
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-category]'))
  const countEl = document.querySelector<HTMLElement>('[data-match-count]')
  const emptyEl = document.querySelector<HTMLElement>('[data-search-empty]')
  const emptyQuery = document.querySelector<HTMLElement>('[data-search-empty-query]')

  const apply = () => {
    const q = search.value.trim().toLowerCase()
    let n = 0
    for (const c of cards) {
      const hit = !q || (c.dataset.search ?? '').includes(q)
      c.classList.toggle('hidden', !hit)
      if (hit) n++
    }
    for (const s of sections) {
      const any = Array.from(s.querySelectorAll('[data-search]')).some(
        (c) => !c.classList.contains('hidden'),
      )
      s.classList.toggle('hidden', !any)
    }
    if (countEl) countEl.textContent = `${n} / ${cards.length}`
    if (emptyEl) {
      emptyEl.classList.toggle('hidden', n !== 0)
      if (emptyQuery) emptyQuery.textContent = q
    }
  }
  search.addEventListener('input', apply)

  window.addEventListener('keydown', (e) => {
    const el = e.target as HTMLElement
    if (
      e.key !== '/' ||
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.isContentEditable
    )
      return
    e.preventDefault()
    search.focus()
  })
}
