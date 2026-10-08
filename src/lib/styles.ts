// Shared Tailwind class strings. cx joins conditional class lists.
export const cx = (...xs: (string | false | null | undefined)[]): string =>
  xs.filter(Boolean).join(' ')

export const section = 'mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12'

export const sectionTitle = 'mb-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl'

export const sectionBlurb = 'max-w-xl text-sm leading-relaxed text-muted md:text-base'

export const card = cx(
  'block rounded-xl border border-line bg-surface-alpha p-5',
  'transition-[border-color,transform,background] duration-200',
  'hover:border-faint hover:-translate-y-0.5',
)

const buttonBase = cx(
  'inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5',
  'font-mono text-sm font-medium no-underline',
  'transition-[opacity,border-color,background] duration-150',
)

export const button = (intent: 'solid' | 'ghost' = 'ghost'): string =>
  intent === 'solid'
    ? cx(buttonBase, 'border-accent bg-accent text-on-accent hover:opacity-85')
    : cx(buttonBase, 'border-line text-fg hover:border-faint')

export const textLink = cx(
  'text-fg underline decoration-faint underline-offset-[3px]',
  'transition-colors hover:text-accent hover:decoration-accent',
)

export const codeBlock = cx(
  'overflow-x-auto rounded-lg border border-line bg-raised px-4 py-3',
  'font-mono text-xs whitespace-nowrap text-fg md:text-sm',
)

export const toneFresh = 'text-fresh'
export const toneAging = 'text-aging'
export const toneStale = 'text-stale'

export type BadgeTone = 'solid' | 'outline' | 'dim' | 'warn'

const badgeBase = cx(
  'inline-flex items-center rounded-full border px-2.5 py-1',
  'font-mono text-xs uppercase tracking-[0.08em]',
)

const badgeTones: Record<BadgeTone, string> = {
  solid: 'border-accent bg-accent text-on-accent',
  outline: 'border-line text-muted',
  dim: 'border-line text-faint',
  warn: 'border-warn text-warn',
}

export const badge = (tone: BadgeTone = 'outline'): string => cx(badgeBase, badgeTones[tone])
