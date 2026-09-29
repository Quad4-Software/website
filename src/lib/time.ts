const DAY_MS = 86_400_000

export const ageInDays = (iso: string): number =>
  Math.max(0, (Date.now() - new Date(iso).getTime()) / DAY_MS)

export const formatAge = (iso: string): string => {
  const d = ageInDays(iso)
  if (d < 1) return 'today'
  if (d < 30) return `${Math.floor(d)}d ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}

export type AgeTone = 'fresh' | 'aging' | 'stale'

export const ageTone = (iso: string): AgeTone => {
  const d = ageInDays(iso)
  if (d < 30) return 'fresh'
  if (d < 180) return 'aging'
  return 'stale'
}
