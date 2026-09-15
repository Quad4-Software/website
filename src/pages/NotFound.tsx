import { A } from '@solidjs/router'
import PageMeta from '../lib/seo'
import BlackHole from '../components/BlackHole'
import { button } from '../lib/styles'
import { css } from '../../styled-system/css'

const wrap = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: { base: '12', md: '16' },
  textAlign: 'center',
})

const code = css({
  fontFamily: 'mono',
  fontSize: { base: '6xl', md: '8xl' },
  fontWeight: 700,
  letterSpacing: '-0.04em',
  lineHeight: '1',
})

const text = css({
  mt: '3',
  color: 'muted',
  fontSize: 'md',
})

export default function NotFound() {
  return (
    <>
      <PageMeta title="404" description="Page not found." path="/404" />
      <section class={wrap}>
        <BlackHole
          class={css({ display: 'block', w: '100%', maxW: '22rem', mx: 'auto', color: 'fg' })}
        />
        <h1 class={code}>404</h1>
        <p class={text}>This page crossed the event horizon. Nothing came back.</p>
        <div class={css({ mt: '8' })}>
          <A href="/" class={button({ intent: 'solid' })}>
            Back to base
          </A>
        </div>
      </section>
    </>
  )
}
