import { createSignal, onCleanup, onMount, Show } from 'solid-js'
import { hole, holeRect, pointer, pointerOK, trackPointer } from '../lib/gravity'
import { css } from '../../styled-system/css'

const horizonFill = css({ fill: 'canvas' })
const diskFlow = css({ animation: 'dashFlow 24s linear infinite' })

interface Props {
  class?: string
}

export default function BlackHole(props: Props) {
  const [motion, setMotion] = createSignal(false)
  let el!: SVGSVGElement

  onMount(() => {
    hole.el = el
    setMotion(!matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (!pointerOK()) return

    trackPointer()
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
    onCleanup(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', wake)
      document.removeEventListener('pointerleave', wake)
    })
  })

  onCleanup(() => {
    hole.el = undefined
  })

  return (
    <svg
      ref={el}
      viewBox="0 0 640 460"
      class={props.class}
      aria-hidden="true"
      fill="none"
      role="presentation"
      style={{ 'transform-origin': '50% 50%' }}
    >
      <defs>
        <linearGradient id="q4-disk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="currentColor" stop-opacity="0" />
          <stop offset="0.28" stop-color="currentColor" stop-opacity="0.7" />
          <stop offset="0.7" stop-color="currentColor" stop-opacity="0.22" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="q4-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.95" />
          <stop offset="0.45" stop-color="currentColor" stop-opacity="0.5" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0.12" />
        </linearGradient>
        <filter id="q4-faint" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id="q4-occlude" clipPathUnits="userSpaceOnUse">
          <path
            clip-rule="evenodd"
            d="M -600 -600 H 600 V 600 H -600 Z M 84 0 A 84 84 0 1 0 -84 0 A 84 84 0 1 0 84 0 Z"
          />
          <rect x="-600" y="0" width="1200" height="600" />
        </clipPath>
      </defs>

      <g transform="rotate(-10 320 230)" stroke="currentColor">
        <path
          d="M 20 230 A 300 82 0 0 1 620 230"
          stroke="url(#q4-disk)"
          stroke-width="16"
          opacity="0.3"
        />
        <path d="M 20 230 A 300 82 0 0 1 620 230" stroke="url(#q4-rim)" stroke-width="1.6" />
        <path
          d="M 68 230 A 252 66 0 0 1 572 230"
          stroke-width="1.2"
          opacity="0.38"
          stroke-dasharray="2 7"
          class={diskFlow}
        />
        <path
          d="M 170 230 A 150 40 0 0 1 470 230"
          stroke="url(#q4-rim)"
          stroke-width="2.4"
          opacity="0.7"
        />
        <path d="M 208 230 A 112 29 0 0 1 432 230" stroke-width="1.2" opacity="0.5" />
      </g>

      <path
        d="M 195 222 A 130 80 0 0 1 445 222"
        stroke="currentColor"
        stroke-width="2.2"
        opacity="0.55"
      />
      <path
        d="M 195 238 A 130 80 0 0 0 445 238"
        stroke="currentColor"
        stroke-width="1.5"
        opacity="0.24"
      />

      <circle cx="320" cy="230" r="84" class={horizonFill} />
      <circle
        cx="320"
        cy="230"
        r="89"
        stroke="currentColor"
        stroke-width="5"
        opacity="0.22"
        filter="url(#q4-faint)"
      />
      <circle cx="320" cy="230" r="89" stroke="currentColor" stroke-width="1.6" opacity="0.9" />
      <circle cx="320" cy="230" r="86" stroke="currentColor" stroke-width="0.7" opacity="0.5" />

      <g transform="rotate(-10 320 230)" stroke="currentColor">
        <path
          d="M 620 230 A 300 82 0 0 1 20 230"
          stroke="url(#q4-rim)"
          stroke-width="1.6"
          opacity="0.85"
        />
        <path
          d="M 572 230 A 252 66 0 0 1 68 230"
          stroke-width="1.1"
          opacity="0.4"
          stroke-dasharray="2 7"
        />
        <path
          d="M 470 230 A 150 40 0 0 1 170 230"
          stroke="url(#q4-rim)"
          stroke-width="2.2"
          opacity="0.7"
        />
        <circle cx="499" cy="231" r="2" fill="currentColor" stroke="none" opacity="0.8" />
        <circle cx="118" cy="246" r="1.6" fill="currentColor" stroke="none" opacity="0.55" />
        <circle cx="222" cy="297" r="1.4" fill="currentColor" stroke="none" opacity="0.45" />
      </g>

      <Show when={motion()}>
        <g transform="translate(320 230)">
          <g transform="rotate(-10)">
            <g clip-path="url(#q4-occlude)">
              <g transform="scale(1 0.268)">
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="16s"
                    repeatCount="indefinite"
                  />
                  <circle cx="215" cy="0" r="3" fill="currentColor" stroke="none" />
                </g>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="140"
                    to="500"
                    dur="26s"
                    repeatCount="indefinite"
                  />
                  <circle cx="300" cy="0" r="2" fill="currentColor" stroke="none" opacity="0.65" />
                </g>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="260"
                    to="620"
                    dur="38s"
                    repeatCount="indefinite"
                  />
                  <circle cx="262" cy="0" r="1.4" fill="currentColor" stroke="none" opacity="0.4" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </Show>
    </svg>
  )
}
