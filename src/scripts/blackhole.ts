// Pointer gravity: the hole leans toward the cursor within reach.
import { holeRect, holeSvg, pointer, pointerOK, trackPointer } from './gravity'

if (holeSvg && pointerOK()) {
  trackPointer()
  const el = holeSvg
  let x = 0
  let y = 0
  let rot = 0
  let raf = 0
  const tick = () => {
    raf = 0
    let tx = 0
    let ty = 0
    let tr = 0
    if (pointer.active) {
      const hr = holeRect()
      if (hr) {
        const dx = pointer.x - hr.x
        const dy = pointer.y - hr.y
        const d = Math.hypot(dx, dy)
        const reach = hr.r * 4
        if (d > 1 && d < reach) {
          const k = 1 - d / reach
          const pull = k * k * hr.r * 0.14
          tx = (dx / d) * pull
          ty = (dy / d) * pull
          tr = Math.max(-2.5, Math.min(2.5, (dx / hr.r) * 1.4))
        }
      }
    }
    x += (tx - x) * 0.08
    y += (ty - y) * 0.08
    rot += (tr - rot) * 0.08
    el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rot.toFixed(3)}deg)`
    if (pointer.active || Math.abs(x) > 0.05 || Math.abs(y) > 0.05 || Math.abs(rot) > 0.01) {
      raf = requestAnimationFrame(tick)
    }
  }
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick)
  }
  window.addEventListener('pointermove', wake, { passive: true })
  document.addEventListener('pointerleave', wake)
}
