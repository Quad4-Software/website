// Canvas starfield. Stars twinkle, and near the black hole they get
// captured or lensed. Static single frame when motion is reduced.
import { holeRect, motionOK } from './gravity'

const cv = document.querySelector<HTMLCanvasElement>('[data-starfield]')

if (cv) {
  const ctx = cv.getContext('2d')
  if (ctx) {
    const STAR_COUNT = 190
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

    const seed = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() < 0.75 ? 1 : 1.6,
      a: 0.25 + Math.random() * 0.6,
      sp: 0.4 + Math.random() * 1.1,
      ph: Math.random() * Math.PI * 2,
    })

    let stars: ReturnType<typeof seed>[] = []
    let t = 0

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
        requestAnimationFrame(loop)
        if ((skip = !skip)) return
        step()
      }
      requestAnimationFrame(loop)
    } else {
      t = 1
      step()
    }
  }
}
