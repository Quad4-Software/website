import { createSignal, For, Show } from 'solid-js'
import { ArrowUpRight } from 'lucide-solid'
import InfraGlyph from './InfraGlyph'
import {
  INFRA_LINKS,
  INFRA_NODES,
  INFRA_SYSTEMS,
  type InfraNode,
  type InfraSystem,
} from '../data/infra'
import { motionOK } from '../lib/gravity'
import { css } from '../../styled-system/css'

const panel = css({ position: 'relative' })

const map = css({
  display: 'block',
  w: '100%',
  h: 'auto',
  color: 'fg',
})

const edge = css({
  stroke: 'faint',
  strokeWidth: '1',
  opacity: 0.4,
})

const edgeFlow = css({
  stroke: 'fg',
  strokeWidth: '1',
  opacity: 0.3,
  strokeDasharray: '1 9',
})

const edgeOverlay = css({
  stroke: 'faint',
  strokeWidth: '1',
  opacity: 0.3,
  strokeDasharray: '3 6',
})

const orbitRing = css({
  fill: 'none',
  stroke: 'faint',
  strokeWidth: '1',
  opacity: 0.3,
  strokeDasharray: '2 6',
})

const node = css({ cursor: 'pointer' })

const sunCore = css({
  fill: 'surfaceAlpha',
  stroke: 'line',
  strokeWidth: '1',
  transition: 'stroke 0.15s ease',
})

const planetRing = css({
  fill: 'surfaceAlpha',
  stroke: 'line',
  strokeWidth: '1',
  transition: 'stroke 0.15s ease',
})

const name = css({
  fill: 'muted',
  fontFamily: 'mono',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.05em',
  transition: 'fill 0.15s ease',
})

const sub = css({
  fill: 'faint',
  fontFamily: 'mono',
  fontSize: '10px',
  textAnchor: 'middle',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const hud = css({
  position: 'absolute',
  left: '4',
  bottom: '4',
  maxW: '19rem',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'lg',
  bg: 'canvasAlpha',
  px: '4',
  py: '3',
})

const hudHint = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
  letterSpacing: '0.08em',
})

const hudName = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  fontWeight: 700,
})

const hudRole = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
  ml: '2',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
})

const hudDesc = css({
  mt: '1.5',
  fontSize: 'sm',
  color: 'muted',
  lineHeight: 'relaxed',
})

const hudLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
  mt: '2',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'fg',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
})

const legend = css({
  position: 'absolute',
  top: '3',
  right: '4',
  display: 'flex',
  gap: '4',
  fontFamily: 'mono',
  fontSize: '2xs',
  color: 'faint',
  letterSpacing: '0.08em',
})

const legendItem = css({ display: 'inline-flex', alignItems: 'center', gap: '1.5' })

const legendTick = css({
  display: 'inline-block',
  w: '4',
  borderTop: '1px solid',
  borderColor: 'faint',
})

const legendTickDash = css({
  display: 'inline-block',
  w: '4',
  borderTop: '1px dashed',
  borderColor: 'faint',
})

interface HudInfo {
  name: string
  meta: string
  desc: string
  href?: string
}

const sysById = new Map(INFRA_SYSTEMS.map((s) => [s.id, s]))
const nodeById = new Map(INFRA_NODES.map((n) => [n.id, n]))

interface Pos {
  x: number
  y: number
  lx: number
  ly: number
  anchor: 'start' | 'middle' | 'end'
}

function nodePos(n: InfraNode): Pos {
  if (n.system) {
    const s = sysById.get(n.system)!
    const a = (((n.angle ?? 0) - 90) * Math.PI) / 180
    const lx = Math.cos(a) * 30
    return {
      x: s.x + Math.cos(a) * s.orbit,
      y: s.y + Math.sin(a) * s.orbit,
      lx,
      ly: Math.sin(a) * 30 + 4,
      anchor: lx < -4 ? 'end' : lx > 4 ? 'start' : 'middle',
    }
  }
  return { x: n.x ?? 0, y: n.y ?? 0, lx: 0, ly: 34, anchor: 'middle' }
}

function posOf(id: string) {
  const s = sysById.get(id)
  if (s) return { x: s.x, y: s.y }
  const n = nodeById.get(id)
  return n ? nodePos(n) : { x: 0, y: 0 }
}

const sysHud = (s: InfraSystem): HudInfo => ({
  name: s.name,
  meta: `${s.provider} ${s.role}`,
  desc: s.desc,
})

const nodeHud = (n: InfraNode): HudInfo => ({
  name: n.name,
  meta: n.role,
  desc: n.desc,
  href: n.href,
})

export default function InfraMap() {
  const [active, setActive] = createSignal<HudInfo | null>(null)
  const motion = motionOK()

  return (
    <div class={panel}>
      <svg viewBox="0 0 1000 640" class={map} aria-hidden="true" role="presentation">
        <For each={INFRA_LINKS}>
          {(l) => {
            const a = posOf(l.a)
            const b = posOf(l.b)
            return (
              <>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} class={l.overlay ? edgeOverlay : edge} />
                {!l.overlay && motion ? (
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} class={edgeFlow}>
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-100"
                      dur="7s"
                      repeatCount="indefinite"
                    />
                  </line>
                ) : null}
              </>
            )
          }}
        </For>

        <For each={INFRA_SYSTEMS}>
          {(s) => (
            <g transform={`translate(${s.x} ${s.y})`}>
              {motion ? (
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="60s"
                    repeatCount="indefinite"
                  />
                  <circle r={s.orbit} class={orbitRing} />
                </g>
              ) : (
                <circle r={s.orbit} class={orbitRing} />
              )}
              <g
                class={node}
                onMouseEnter={() => setActive(sysHud(s))}
                onMouseLeave={() => setActive(null)}
              >
                <circle r="26" fill="transparent" />
                <circle
                  r="14"
                  class={sunCore}
                  style={active()?.name === s.name ? { stroke: 'var(--colors-fg)' } : undefined}
                />
                <InfraGlyph icon={s.icon} size={13} svg />
              </g>
              <text y={-s.orbit - 22} text-anchor="middle" class={name}>
                {s.name}
              </text>
              <text y={-s.orbit - 8} class={sub}>
                {s.provider}
              </text>
            </g>
          )}
        </For>

        <For each={INFRA_NODES}>
          {(n) => {
            const p = nodePos(n)
            return (
              <g
                transform={`translate(${p.x} ${p.y})`}
                class={node}
                onMouseEnter={() => setActive(nodeHud(n))}
                onMouseLeave={() => setActive(null)}
              >
                <circle r="26" fill="transparent" />
                <circle
                  r="15"
                  class={planetRing}
                  style={active()?.name === n.name ? { stroke: 'var(--colors-fg)' } : undefined}
                />
                <InfraGlyph icon={n.icon} size={14} svg />
                <text
                  x={p.lx}
                  y={p.ly}
                  text-anchor={p.anchor}
                  class={name}
                  style={active()?.name === n.name ? { fill: 'var(--colors-fg)' } : undefined}
                >
                  {n.name}
                </text>
              </g>
            )
          }}
        </For>
      </svg>

      <div class={legend}>
        <span class={legendItem}>
          <span class={legendTick} />
          runs on / deploys
        </span>
        <span class={legendItem}>
          <span class={legendTickDash} />
          netbird overlay
        </span>
      </div>

      <div class={hud} aria-hidden="true">
        <Show when={active()} fallback={<span class={hudHint}>hover a system</span>}>
          {(h) => (
            <>
              <div class={hudName}>
                {h().name}
                <span class={hudRole}>{h().meta}</span>
              </div>
              <p class={hudDesc}>{h().desc}</p>
              <Show when={h().href}>
                {(u) => (
                  <a href={u()} target="_blank" rel="noopener noreferrer" class={hudLink}>
                    open {u().replace('https://', '')} <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                )}
              </Show>
            </>
          )}
        </Show>
      </div>
    </div>
  )
}
