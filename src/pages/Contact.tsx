import { Mail, MessageSquare, Satellite } from 'lucide-solid'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import Snippet from '../components/Snippet'
import { SITE } from '../config/site'
import { button, textLink } from '../lib/styles'
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
  gridTemplateColumns: 'minmax(0, 1fr)',
})

const fused = css({
  bg: 'surfaceAlpha',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: { base: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
})

const cell = css({ p: '5' })

const cellSep = css({
  borderTop: '1px solid',
  borderColor: 'line',
  md: { borderTop: 'none', borderLeft: '1px solid' },
})

const sat = css({
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

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Reach Quad4 by email or over the Reticulum network via LXMF."
        path="/contact"
      />

      <PageHeader
        title="Contact"
        blurb="Email works most of the time. LXMF works even when the internet does not."
      />

      <div class={stack}>
        <Satellite size={260} aria-hidden="true" class={sat} />
        <div class={fused}>
          <div class={cell}>
            <div class={cardHead}>
              <Mail size={18} aria-hidden="true" />
              <span class={cardName}>Email</span>
            </div>
            <p class={cardDesc}>The normal way. We read everything.</p>
            <a href={`mailto:${SITE.contact.email}`} class={button()}>
              {SITE.contact.email}
            </a>
          </div>

          <div class={cx(cell, cellSep)}>
            <div class={cardHead}>
              <MessageSquare size={18} aria-hidden="true" />
              <span class={cardName}>LXMF</span>
            </div>
            <p class={cardDesc}>
              Message us over the Reticulum network with any LXMF client, like{' '}
              <a
                href={SITE.links.meshchatx}
                target="_blank"
                rel="noopener noreferrer"
                class={textLink}
              >
                MeshChatX
              </a>
              ,{' '}
              <a
                href={SITE.links.nomadnet}
                target="_blank"
                rel="noopener noreferrer"
                class={textLink}
              >
                NomadNet
              </a>{' '}
              or{' '}
              <a
                href={SITE.links.sideband}
                target="_blank"
                rel="noopener noreferrer"
                class={textLink}
              >
                Sideband
              </a>
              .
            </p>
            <Snippet label="LXMF address" value={SITE.contact.lxmf} />
          </div>
        </div>
      </div>
    </>
  )
}
