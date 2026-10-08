// Copy buttons: [data-copy] carries the text, the button swaps between
// an idle and a done label for a moment after a successful write.
document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest?.('[data-copy]')
  if (!(el instanceof HTMLElement) || el.dataset.copy === undefined) return
  const value = el.dataset.copy
  const idle = el.querySelector<HTMLElement>('[data-copy-idle]')
  const done = el.querySelector<HTMLElement>('[data-copy-done]')
  const flash = () => {
    idle?.classList.replace('inline-flex', 'hidden')
    done?.classList.replace('hidden', 'inline-flex')
    window.setTimeout(() => {
      done?.classList.replace('inline-flex', 'hidden')
      idle?.classList.replace('hidden', 'inline-flex')
    }, 1600)
  }
  void navigator.clipboard?.writeText(value).then(flash, () => {})
})
