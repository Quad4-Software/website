import {
  Bug,
  ExternalLink,
  Gauge,
  PackageSearch,
  ScanLine,
  Sparkles,
  Telescope,
} from 'lucide-solid'
import { For } from 'solid-js'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import { SITE } from '../config/site'
import { badge, button, card } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const stack = css({
  position: 'relative',
  overflowX: 'clip',
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pb: { base: '10', md: '14' },
  display: 'grid',
  gap: '5',
})

const scopeArt = css({
  position: 'absolute',
  top: '-3rem',
  right: { base: '0', md: '-1rem' },
  color: 'faint',
  opacity: 0.12,
  transform: 'rotate(-12deg)',
  pointerEvents: 'none',
  zIndex: -1,
})

const cardHead = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
  mb: '3',
})

const cardName = css({
  fontFamily: 'mono',
  fontWeight: 700,
  fontSize: 'lg',
  letterSpacing: '0.02em',
})

const cardDesc = css({
  fontSize: 'sm',
  color: 'muted',
  lineHeight: 'relaxed',
  mb: '4',
})

const platform = css({
  position: 'relative',
  p: { base: '5', md: '7' },
  bg: 'surfaceAlpha',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  overflow: 'hidden',
})

const platformGlow = css({
  position: 'absolute',
  inset: '0',
  pointerEvents: 'none',
  opacity: 0.35,
  background:
    'radial-gradient(24rem 12rem at 88% -15%, token(colors.glow), transparent 70%)',
})

const capabilityGrid = css({
  display: 'grid',
  gap: '3',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)' },
  mt: '5',
})

const capability = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '3',
})

const capIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '8',
  h: '8',
  rounded: 'md',
  border: '1px solid',
  borderColor: 'line',
  color: 'fg',
  flexShrink: 0,
})

const capTitle = css({ fontSize: 'sm', fontWeight: 600 })
const capText = css({ fontSize: 'xs', color: 'muted', lineHeight: 'relaxed', mt: '0.5' })

const productCard = css({
  position: 'relative',
})

const cornerBadge = css({
  position: 'absolute',
  top: '3',
  right: '3',
})

const ravenLogo = css({
  w: '7',
  h: '7',
  objectFit: 'contain',
  flexShrink: 0,
})

const featureRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
  mb: '4',
})

const featureChip = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'muted',
  px: '2.5',
  py: '1',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line',
})

const ravenguardFeatures = [
  'rate limits',
  'bot detection',
  'pow challenge',
  'owasp crs',
  'threat intel',
  'access gates',
]

const capabilities = [
  {
    icon: ScanLine,
    title: 'Static scanning',
    text: 'SAST, secrets and misconfig checks across the whole tree.',
  },
  {
    icon: PackageSearch,
    title: 'Supply chain',
    text: 'Dependencies, lockfiles, CI permissions and release artifacts.',
  },
  {
    icon: Bug,
    title: 'Private tooling',
    text: 'Our own methodology for hunting bugs and security flaws.',
  },
  {
    icon: Sparkles,
    title: 'AI Security Auditing',
    text: 'Using zero-data retention open-weight models.',
  },
]

export default function Security() {
  return (
    <>
      <PageMeta
        title="Security"
        description="Quad4 audits software for free. Code audits and supply chain analysis for any git repository, including rngit remotes, reported privately to the maintainer."
        path="/security"
      />

      <PageHeader
        title="Security"
        blurb="We audit software for free. Send us a repository and we read the code, check what it pulls in, and tell you what we find before anyone else hears about it."
      />

      <div class={stack}>
        <Telescope size={260} aria-hidden="true" class={scopeArt} />

        <div class={platform}>
          <span class={platformGlow} />
          <div>
            <div class={cardHead}>
              <Gauge size={18} aria-hidden="true" />
              <span class={cardName}>Quad4 Security Platform</span>
              <span class={badge({ tone: 'solid' })}>Coming soon</span>
            </div>
            <p class={cardDesc}>
              Our own audit dashboard. Point it at any git repo, including rngit remotes, and it
              scans the code for security issues.
            </p>
            <div class={capabilityGrid}>
              <For each={capabilities}>
                {(c) => (
                  <div class={capability}>
                    <span class={capIcon}>
                      <c.icon size={15} aria-hidden="true" />
                    </span>
                    <div>
                      <div class={capTitle}>{c.title}</div>
                      <div class={capText}>{c.text}</div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class={cx(card, productCard)}>
          <span class={cx(badge({ tone: 'warn' }), cornerBadge)}>Alpha</span>
          <div class={cardHead}>
            <img src="/ravenguard.webp" alt="" width={28} height={28} class={ravenLogo} />
            <span class={cardName}>Ravenguard</span>
          </div>
          <p class={cardDesc}>
            Our web application firewall. Blocks bots, scanners and AI scrapers before they reach
            your site.
          </p>
          <div class={featureRow}>
            <For each={ravenguardFeatures}>{(f) => <span class={featureChip}>{f}</span>}</For>
          </div>
          <a
            href={SITE.links.ravenguard}
            target="_blank"
            rel="noopener noreferrer"
            class={button()}
          >
            ravenguard.quad4.io <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  )
}
