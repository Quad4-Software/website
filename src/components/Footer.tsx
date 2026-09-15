import { For } from 'solid-js'
import { A } from '@solidjs/router'
import GithubIcon from './GithubIcon'
import Mark from './Mark'
import { FOOTER_SECTIONS } from '../config/nav'
import { SITE } from '../config/site'
import { css } from '../../styled-system/css'

const footer = css({
  mt: '8',
})

const inner = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: '10',
  display: 'grid',
  gap: '8',
  gridTemplateColumns: { base: '1fr', md: '2fr 1fr 1fr' },
})

const colTitle = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: 'faint',
  mb: '4',
})

const footLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  py: '1',
  fontSize: 'sm',
  color: 'muted',
  textDecoration: 'none',
  _hover: { color: 'fg' },
})

const footIcon = css({
  w: '4',
  h: '4',
  rounded: 'sm',
})

const bottom = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: '5',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
})

export default function Footer() {
  return (
    <footer class={footer}>
      <div class={inner}>
        <div>
          <div class={css({ display: 'flex', alignItems: 'center', gap: '2.5', mb: '3' })}>
            <Mark size={20} decorative />
            <span
              class={css({
                fontFamily: 'mono',
                fontWeight: 700,
                fontSize: 'sm',
                letterSpacing: '0.22em',
              })}
            >
              {SITE.name.toUpperCase()}
            </span>
          </div>
          <p class={css({ fontSize: 'sm', color: 'muted', maxW: '24rem', lineHeight: 'relaxed' })}>
            Independent software collective. Mesh networking, offline-first web and self-hosted
            infrastructure.
          </p>
        </div>

        <For each={FOOTER_SECTIONS}>
          {(s) => (
            <nav aria-label={s.title}>
              <h2 class={colTitle}>{s.title}</h2>
              <For each={s.links}>
                {(l) =>
                  l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" class={footLink}>
                      {l.icon === 'github' ? (
                        <GithubIcon size={16} class={footIcon} decorative />
                      ) : l.icon === 'mark' ? (
                        <Mark size={16} class={footIcon} decorative />
                      ) : l.icon ? (
                        <img src={l.icon} alt="" width="16" height="16" class={footIcon} />
                      ) : null}
                      {l.label}
                    </a>
                  ) : (
                    <A href={l.href} class={footLink}>
                      {l.label}
                    </A>
                  )
                }
              </For>
            </nav>
          )}
        </For>
      </div>

      <div class={bottom}>
        <span>
          &copy; {new Date().getFullYear()} {SITE.name}
        </span>
        <span>No trackers. No telemetry.</span>
        <span>Built with Solid, Panda and Ark</span>
      </div>
    </footer>
  )
}
