// Shared state for the black hole effects. The hole registers its element
// here and consumers read holeRect() inside their rAF loops so scroll and
// resize are handled for free.

export const hole: { el?: Element } = {}
export const pointer = { x: 0, y: 0, active: false }

export function motionOK() {
  return typeof window !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function pointerOK() {
  return motionOK() && matchMedia('(pointer: fine)').matches
}

let tracking = false
export function trackPointer() {
  if (tracking || !pointerOK()) return
  tracking = true
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => {
    pointer.active = false
  })
}

export function holeRect() {
  const el = hole.el
  if (!el) return null
  const b = el.getBoundingClientRect()
  return { x: b.left + b.width / 2, y: b.top + b.height / 2, r: Math.min(b.width, b.height) / 2 }
}
