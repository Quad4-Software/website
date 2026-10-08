import { SITE } from '../config/site'

type Theme = 'light' | 'dark'

// Theme toggle
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

// Mobile menu
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

// Copy buttons
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

// Projects search and filter
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

// Black hole pointer gravity and the shared starfield. The hole registers
// through holeRect() so scroll and resize are handled for free.
const holeSvg = document.querySelector<SVGElement>('[data-blackhole]')
const pointer = { x: 0, y: 0, active: false }
const motionOK = () => !matchMedia('(prefers-reduced-motion: reduce)').matches
const pointerOK = () => motionOK() && matchMedia('(pointer: fine)').matches

const holeRect = () => {
  if (!holeSvg) return null
  const b = holeSvg.getBoundingClientRect()
  return { x: b.left + b.width / 2, y: b.top + b.height / 2, r: Math.min(b.width, b.height) / 2 }
}

if (pointerOK() && (holeSvg || document.querySelector('[data-starfield]'))) {
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

if (holeSvg && pointerOK()) {
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

// Starfield canvas
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
      void raf
    } else {
      t = 1
      step()
    }
  }
}
