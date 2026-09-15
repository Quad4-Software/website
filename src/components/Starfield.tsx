import { onCleanup, onMount } from 'solid-js'
import { holeRect, motionOK } from '../lib/gravity'
import { css } from '../../styled-system/css'

const wrap = css({
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0,
})

const layer = css({ position: 'absolute', inset: 0, w: 'full', h: 'full', color: 'star' })

interface Star {
  x: number
  y: number
  r: number
  a: number
  sp: number
  ph: number
}

const STAR_COUNT = 190

export default function Starfield() {
  let cv!: HTMLCanvasElement

  onMount(() => {
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const motion = motionOK()

    let w = 0
    let h = 0
    let starColor = '#fff'

    const readColor = () => {
      starColor = getComputedStyle(cv).color
    }
    readColor()
    const themeWatch = new MutationObserver(readColor)
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const seed = (): Star => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() < 0.75 ? 1 : 1.6,
      a: 0.25 + Math.random() * 0.6,
      sp: 0.4 + Math.random() * 1.1,
      ph: Math.random() * Math.PI * 2,
    })

    let stars: Star[] = []
    let t = 0
    let raf = 0

    const step = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = starColor
      const hr = holeRect()
      const horizon = hr ? hr.r * 0.36 : 0

      for (const s of stars) {
        let x = s.x
        let y = s.y
        let boost = 0
        if (hr) {
          const dx = s.x - hr.x
          const dy = s.y - hr.y
          const d = Math.hypot(dx, dy)
          const captureR = hr.r * 0.95
          const lensR = hr.r * 1.6
          if (d < captureR && d > 1) {
            const pull = (captureR - d) / captureR
            const ang = Math.atan2(dy, dx) + 0.08 + pull * 0.35
            const nd = d * (1 - 0.015 - pull * 0.05)
            if (nd < horizon) {
              Object.assign(s, seed())
            } else {
              s.x = hr.x + Math.cos(ang) * nd
              s.y = hr.y + Math.sin(ang) * nd
            }
            boost = pull * 0.4
          } else if (d < lensR && d > 1) {
            const k = 1 - d / lensR
            const ang = Math.atan2(dy, dx) + k * k * 0.45
            x = hr.x + Math.cos(ang) * d
            y = hr.y + Math.sin(ang) * d
            const ring = Math.abs(d - hr.r * 0.44)
            boost = Math.max(0, 1 - ring / (hr.r * 0.55)) * 0.55
          }
        }
        const tw = 0.65 + 0.35 * Math.sin(t * s.sp + s.ph)
        ctx.globalAlpha = Math.min(1, s.a * tw + boost)
        ctx.fillRect(x, y, s.r, s.r)
      }

      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.25)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: STAR_COUNT }, seed)
      if (!motion) step()
    }
    resize()
    window.addEventListener('resize', resize)

    if (motion) {
      let skip = false
      const loop = () => {
        raf = requestAnimationFrame(loop)
        if ((skip = !skip)) return
        step()
      }
      raf = requestAnimationFrame(loop)
    } else {
      t = 1
      step()
    }

    onCleanup(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      themeWatch.disconnect()
    })
  })

  return (
    <div aria-hidden="true" class={wrap}>
      <canvas ref={cv} class={layer} />
    </div>
  )
}
