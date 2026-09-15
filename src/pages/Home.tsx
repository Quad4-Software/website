import { For } from 'solid-js'
import { A } from '@solidjs/router'
import { ArrowRight, ArrowUpRight, Radio, Server, WifiOff } from 'lucide-solid'
import BlackHole from '../components/BlackHole'
import CopyButton from '../components/CopyButton'
import PageMeta from '../lib/seo'
import ProjectCard from '../components/ProjectCard'
import { SITE, rnsClone } from '../config/site'
import { featured, langCount, repoCount } from '../data/projects'
import { button, card, section, sectionBlurb, sectionTitle } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const hero = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pt: { base: '6', md: '10' },
  pb: { base: '8', md: '12' },
  textAlign: 'center',
})

const heroArt = css({
  display: 'block',
  w: '100%',
  maxW: '34rem',
  mx: 'auto',
  color: 'fg',
})

const h1 = css({
  fontSize: { base: '4xl', md: '6xl' },
  fontWeight: 600,
  letterSpacing: '-0.035em',
  lineHeight: '1.05',
})

const lede = css({
  mt: '5',
  mx: 'auto',
  maxW: '36rem',
  color: 'muted',
  fontSize: { base: 'md', md: 'lg' },
  lineHeight: 'relaxed',
})

const ctaRow = css({
  mt: '8',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3',
  justifyContent: 'center',
})

const rise = css({ animation: 'rise 0.7s ease both' })

const statsWrap = css({
  borderY: '1px solid',
  borderColor: 'line',
})

const statsGrid = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
})

const stat = css({
  py: '8',
  px: '4',
  textAlign: 'center',
  borderLeft: '1px solid',
  borderColor: 'line',
  _first: { borderLeft: 'none' },
})

const statValue = css({
  fontFamily: 'mono',
  fontSize: { base: '2xl', md: '3xl' },
  fontWeight: 700,
})

const statLabel = css({
  mt: '1',
  fontSize: 'xs',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'faint',
})

const pillarGrid = css({
  mt: '8',
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
})

const iconBox = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '9',
  h: '9',
  rounded: 'lg',
  border: '1px solid',
  borderColor: 'line',
  color: 'fg',
  mb: '4',
})

const pillarTitle = css({ fontWeight: 600, fontSize: 'lg', mb: '2' })
const pillarText = css({ fontSize: 'sm', color: 'muted', lineHeight: 'relaxed' })

const headRow = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '4',
  flexWrap: 'wrap',
  mb: '8',
})

const viewAll = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'muted',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  _hover: { color: 'fg' },
})

const featGrid = css({
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
})

const forgeGrid = css({
  display: 'grid',
  gap: '8',
  alignItems: 'center',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
})

const termCard = css({
  bg: 'surface',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  overflow: 'hidden',
})

const termBar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5',
  px: '4',
  py: '2.5',
  borderBottom: '1px solid',
  borderColor: 'line',
})

const termDot = css({ w: '2.5', h: '2.5', rounded: 'full', bg: 'line' })

const termBody = css({
  p: '4',
  fontFamily: 'mono',
  fontSize: { base: 'xs', sm: 'sm' },
  overflowX: 'auto',
  whiteSpace: 'nowrap',
})

const prompt = css({ color: 'faint', userSelect: 'none' })

const pillars = [
  {
    icon: Radio,
    title: 'Mesh networking',
    text: 'Apps and services for the Reticulum network. Messaging, browsing and file sync that keep working off the regular internet.',
  },
  {
    icon: WifiOff,
    title: 'Offline-first web',
    text: 'Apps for dictation, transcription and translation that run entirely in your browser. No servers, no leaks.',
  },
  {
    icon: Server,
    title: 'Self-hosted infrastructure',
    text: 'Ops platforms, forges, firewalls and libraries you run yourself. If it phones home, we do not ship it.',
  },
]

export default function Home() {
  return (
    <>
      <PageMeta title={SITE.tagline} description={SITE.description} path="/" />

      <section class={hero}>
        <BlackHole class={heroArt} />
        <div class={rise}>
          <h1 class={h1}>Software for the far edge.</h1>
          <p class={lede}>
            {SITE.description} Everything we ship keeps working when the internet does not.
          </p>
          <div class={ctaRow}>
            <A href="/projects" class={button({ intent: 'solid' })}>
              Explore projects <ArrowRight size={15} aria-hidden="true" />
            </A>
            <A href="/git" class={button()}>
              Source and mirrors
            </A>
          </div>
        </div>
      </section>

      <div class={statsWrap}>
        <div class={statsGrid}>
          <div class={stat}>
            <div class={statValue}>{repoCount}</div>
            <div class={statLabel}>Repositories</div>
          </div>
          <div class={stat}>
            <div class={statValue}>{langCount}</div>
            <div class={statLabel}>Languages</div>
          </div>
          <div class={stat}>
            <div class={statValue}>0</div>
            <div class={statLabel}>Trackers</div>
          </div>
          <div class={stat}>
            <div class={statValue}>100%</div>
            <div class={statLabel}>Open source</div>
          </div>
        </div>
      </div>

      <section class={section}>
        <h2 class={sectionTitle}>Three orbits</h2>
        <p class={sectionBlurb}>
          Everything we ship is built to work without asking a server for permission.
        </p>
        <div class={pillarGrid}>
          <For each={pillars}>
            {(p) => (
              <div class={card}>
                <span class={iconBox}>
                  <p.icon size={18} aria-hidden="true" />
                </span>
                <h3 class={pillarTitle}>{p.title}</h3>
                <p class={pillarText}>{p.text}</p>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class={section}>
        <div class={headRow}>
          <div>
            <h2 class={cx(sectionTitle, css({ mb: '0' }))}>Featured projects</h2>
          </div>
          <A href="/projects" class={viewAll}>
            View all {repoCount} <ArrowRight size={14} aria-hidden="true" />
          </A>
        </div>
        <div class={featGrid}>
          <For each={featured}>{(p) => <ProjectCard project={p} />}</For>
        </div>
      </section>

      <section class={section}>
        <div class={forgeGrid}>
          <div>
            <h2 class={sectionTitle}>From the void, a forge</h2>
            <p class={sectionBlurb}>
              Canonical trees live on the network via rngit. Our own forge at git.quad4.io is coming
              back online soon, and GitHub mirrors carry issues, CI and releases.
            </p>
            <div class={css({ mt: '6' })}>
              <A href="/git" class={button()}>
                Source and mirrors <ArrowUpRight size={14} aria-hidden="true" />
              </A>
            </div>
          </div>
          <div class={termCard}>
            <div class={termBar}>
              <span class={termDot} />
              <span class={termDot} />
              <span class={termDot} />
              <span class={css({ ml: 'auto', fontFamily: 'mono', fontSize: 'xs', color: 'faint' })}>
                sh
              </span>
            </div>
            <div class={termBody}>
              <span class={prompt}>$ </span>
              {rnsClone('MeshChatX')}
            </div>
            <div
              class={css({
                px: '4',
                pb: '4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '3',
              })}
            >
              <span class={css({ fontFamily: 'mono', fontSize: 'xs', color: 'faint' })}>
                mirrored on rngit, forge and GitHub
              </span>
              <CopyButton value={rnsClone('MeshChatX')} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
