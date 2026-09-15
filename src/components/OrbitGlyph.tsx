import { For } from 'solid-js'
import { css } from '../../styled-system/css'

const glyph = css({ color: 'fg', display: 'block', flexShrink: 0 })

// FNV-1a. Deterministic so every project keeps the same glyph.
export function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

interface Ring {
  r: number
  dotA: number
}

export function ringsFor(seed: string): Ring[] {
  const h = hashSeed(seed)
  return [7, 12, 17]
    .filter((_, i) => i === 1 || ((h >> (i * 4)) & 1) === 1)
    .map((r, i) => ({ r, dotA: ((h >> (i * 6 + 9)) % 360) * (Math.PI / 180) }))
}

export default function OrbitGlyph(props: { seed: string; size?: number; class?: string }) {
  const rings = () => ringsFor(props.seed)
  return (
    <svg
      viewBox="0 0 40 40"
      width={props.size ?? 26}
      height={props.size ?? 26}
      class={props.class ?? glyph}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <For each={rings()}>
        {(ring) => (
          <>
            <circle
              cx="20"
              cy="20"
              r={ring.r}
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.3"
            />
            <circle
              cx={20 + Math.cos(ring.dotA) * ring.r}
              cy={20 + Math.sin(ring.dotA) * ring.r}
              r="1.6"
              fill="currentColor"
            />
          </>
        )}
      </For>
    </svg>
  )
}
