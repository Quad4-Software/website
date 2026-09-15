import { A, useLocation } from '@solidjs/router'
import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'
import { Menu, X } from 'lucide-solid'
import Mark from './Mark'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '../config/nav'
import { SITE } from '../config/site'
import { css, cx } from '../../styled-system/css'

const header = css({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  bg: 'canvasAlpha',
  backdropFilter: 'blur(14px)',
})

const bar = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  h: '14',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '4',
})

const brand = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2.5',
  color: 'fg',
  textDecoration: 'none',
})

const wordmark = css({
  fontFamily: 'mono',
  fontWeight: 700,
  fontSize: 'sm',
  letterSpacing: '0.22em',
})

const linksRow = css({
  display: { base: 'none', md: 'flex' },
  alignItems: 'center',
  gap: '6',
})

const link = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'muted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: { color: 'fg' },
})

const linkActive = css({
  color: 'fg',
})

const iconBtn = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '8',
  h: '8',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line',
  color: 'muted',
  cursor: 'pointer',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  _hover: { color: 'fg', borderColor: 'faint' },
})

const burger = css({
  display: { base: 'inline-flex', md: 'none' },
})

const panel = css({
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  display: { md: 'none' },
  bg: 'canvasAlpha',
  backdropFilter: 'blur(14px)',
  px: '5',
  py: '3',
  borderBottom: '1px solid',
  borderColor: 'line',
})

const panelLink = css({
  display: 'block',
  py: '3',
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'muted',
  textDecoration: 'none',
  borderBottom: '1px solid',
  borderColor: 'line',
  _last: { borderBottom: 'none' },
  _hover: { color: 'fg' },
})

export default function Nav() {
  const [open, setOpen] = createSignal(false)
  const location = useLocation()

  createEffect(() => {
    void location.pathname
    setOpen(false)
  })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
  }
  document.addEventListener('keydown', onKey)
  onCleanup(() => document.removeEventListener('keydown', onKey))

  return (
    <header class={header}>
      <nav class={bar} aria-label="Main">
        <A href="/" class={brand} aria-label={`${SITE.name} home`}>
          <Mark size={22} decorative />
          <span class={wordmark}>{SITE.name.toUpperCase()}</span>
        </A>

        <div class={linksRow}>
          <For each={NAV_LINKS}>
            {(l) => (
              <A href={l.href} class={link} activeClass={linkActive}>
                {l.label}
              </A>
            )}
          </For>
        </div>

        <div class={css({ display: 'flex', alignItems: 'center', gap: '2.5' })}>
          <ThemeToggle />
          <button
            type="button"
            class={cx(iconBtn, burger)}
            aria-expanded={open()}
            aria-label={open() ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open())}
          >
            {open() ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <Show when={open()}>
        <div class={panel}>
          <For each={NAV_LINKS}>
            {(l) => (
              <A href={l.href} class={panelLink} activeClass={linkActive}>
                {l.label}
              </A>
            )}
          </For>
          <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" class={panelLink}>
            GitHub
          </a>
        </div>
      </Show>
    </header>
  )
}
