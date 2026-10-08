// Deterministic orbit glyph geometry. FNV-1a so every project keeps
// the same glyph.

export interface Ring {
  r: number
  dotA: number
}

export function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function ringsFor(seed: string): Ring[] {
  const h = hashSeed(seed)
  return [7, 12, 17]
    .filter((_, i) => i === 1 || ((h >> (i * 4)) & 1) === 1)
    .map((r, i) => ({ r, dotA: ((h >> (i * 6 + 9)) % 360) * (Math.PI / 180) }))
}
