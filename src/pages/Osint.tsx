import { For } from 'solid-js'
import { ExternalLink } from 'lucide-solid'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import ProjectCard from '../components/ProjectCard'
import { SITE } from '../config/site'
import { osintProjects } from '../data/projects'
import { button } from '../lib/styles'
import { css } from '../../styled-system/css'

const stack = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pb: { base: '10', md: '14' },
  display: 'grid',
  gap: '5',
})

const orgCard = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  bg: 'surfaceAlpha',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  p: '5',
})

const orgLogo = css({
  w: '12',
  h: '12',
  rounded: 'lg',
  flexShrink: 0,
})

const orgName = css({
  fontFamily: 'mono',
  fontWeight: 700,
  fontSize: 'lg',
  letterSpacing: '0.02em',
})

const orgDesc = css({
  fontSize: 'sm',
  color: 'muted',
  lineHeight: 'relaxed',
  mb: '3',
})

const grid = css({
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
})

export default function Osint() {
  return (
    <>
      <PageMeta
        title="OSINT"
        description="Quad4 OSINT tools in the quad4-osint GitHub org: username lookups, email records, YouTube and website analysis."
        path="/osint"
      />

      <PageHeader
        title="OSINT"
        blurb="Open-source intelligence tools in their own GitHub org. Username lookups, email records, video and site analysis."
      />

      <div class={stack}>
        <div class={orgCard}>
          <img src={SITE.osint.logo} alt="" width={48} height={48} class={orgLogo} />
          <div>
            <div class={orgName}>{SITE.osint.name}</div>
            <p class={orgDesc}>{SITE.osint.desc}</p>
            <a href={SITE.osint.url} target="_blank" rel="noopener noreferrer" class={button()}>
              {SITE.osint.org} <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class={grid}>
          <For each={osintProjects}>{(p) => <ProjectCard project={p} />}</For>
        </div>
      </div>
    </>
  )
}
