// Shared state for the black hole effects. The hole element registers via
// data-blackhole and consumers read holeRect() inside their rAF loops so
// scroll and resize are handled for free.

export const pointer = { x: 0, y: 0, active: false }

export const motionOK = () => !matchMedia('(prefers-reduced-motion: reduce)').matches
export const pointerOK = () => motionOK() && matchMedia('(pointer: fine)').matches

export const holeSvg = document.querySelector<SVGElement>('[data-blackhole]')

export function holeRect() {
  if (!holeSvg) return null
  const b = holeSvg.getBoundingClientRect()
  return { x: b.left + b.width / 2, y: b.top + b.height / 2, r: Math.min(b.width, b.height) / 2 }
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
