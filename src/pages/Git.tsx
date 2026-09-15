import { ExternalLink, Orbit } from 'lucide-solid'
import GithubIcon from '../components/GithubIcon'
import Mark from '../components/Mark'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import Snippet from '../components/Snippet'
import { SITE } from '../config/site'
import { badge, button, card } from '../lib/styles'
import { css } from '../../styled-system/css'

const stack = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pb: { base: '10', md: '14' },
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: '5',
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

const topo = css({
  mt: '2',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'muted',
})

const topoNode = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'full',
  px: '3',
  py: '1.5',
})

const topoRole = css({ color: 'faint' })

const topoDot = css({
  w: '1',
  h: '1',
  rounded: 'full',
  bg: 'faint',
})

export default function Git() {
  return (
    <>
      <PageMeta
        title="Source"
        description="Where Quad4 code lives: rngit over Reticulum is canonical, git.quad4.io runs our Forgejo fork, and GitHub mirrors issues, CI and releases."
        path="/git"
      />

      <PageHeader
        title="Source repositories"
        blurb="Canonical development happens over Reticulum. Public forges mirror the trees for browsing, CI and releases."
      />

      <div class={stack}>
        <div class={card}>
          <div class={cardHead}>
            <Orbit size={18} aria-hidden="true" />
            <span class={cardName}>rngit</span>
            <span class={badge({ tone: 'solid' })}>Canonical</span>
          </div>
          <p class={cardDesc}>
            Git over Reticulum. Clone straight from our node on the network, or browse the repos on
            NomadNet. No accounts, no CI minutes.
          </p>
          <Snippet label="Clone over Reticulum" value={SITE.rngit.cloneTemplate} />
          <Snippet label="Browse on NomadNet" value={SITE.rngit.nomadnet} />
        </div>

        <div class={card}>
          <div class={cardHead}>
            <Mark size={18} decorative />
            <span class={cardName}>git.quad4.io</span>
            <span class={badge()}>Returning soon</span>
          </div>
          <p class={cardDesc}>
            Our own forge. Runs Quad4-Software/forge, a hardened Forgejo fork served under the Quad4
            mark. Coming back online soon.
          </p>
          <Snippet
            label="Clone over HTTPS"
            value={`git clone ${SITE.links.forge}/quad4/<repo>.git`}
          />
          <a href={SITE.links.forge} target="_blank" rel="noopener noreferrer" class={button()}>
            Open forge <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        <div class={card}>
          <div class={cardHead}>
            <GithubIcon size={18} decorative />
            <span class={cardName}>GitHub</span>
            <span class={badge({ tone: 'dim' })}>Mirror</span>
          </div>
          <p class={cardDesc}>
            Public mirror for issues, pull requests, CI and releases. Fine for most contributors.
          </p>
          <Snippet label="Clone over HTTPS" value={`git clone ${SITE.links.github}/<repo>`} />
          <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" class={button()}>
            Open Quad4-Software <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        <div class={topo}>
          <span class={css({ color: 'faint' })}>remotes</span>
          <span class={topoNode}>
            <Orbit size={12} aria-hidden="true" />
            rngit <span class={topoRole}>canonical</span>
          </span>
          <span class={topoDot} />
          <span class={topoNode}>
            <Mark size={12} decorative />
            git.quad4.io <span class={topoRole}>forge</span>
          </span>
          <span class={topoDot} />
          <span class={topoNode}>
            <GithubIcon size={12} decorative />
            github <span class={topoRole}>mirror</span>
          </span>
          <span class={css({ color: 'faint' })}>same trees, three transports</span>
        </div>
      </div>
    </>
  )
}
