import type { JSX } from 'solid-js'
import { css, cx } from '../../styled-system/css'
import { badge, sectionBlurb } from '../lib/styles'

const header = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pt: { base: '8', md: '12' },
  pb: { base: '4', md: '6' },
})

const h1 = css({
  fontSize: { base: '3xl', md: '5xl' },
  fontWeight: 600,
  letterSpacing: '-0.03em',
})

const titleBadge = css({
  display: 'inline-block',
  ml: '3',
  verticalAlign: 'middle',
})

interface Props {
  title: string
  badge?: string
  blurb?: string
  children?: JSX.Element
}

export default function PageHeader(props: Props) {
  return (
    <section class={header}>
      <h1 class={h1}>
        {props.title}
        {props.badge ? (
          <span class={cx(badge({ tone: 'outline' }), titleBadge)}>{props.badge}</span>
        ) : null}
      </h1>
      {props.blurb ? <p class={cx(sectionBlurb, css({ mt: '3' }))}>{props.blurb}</p> : null}
      {props.children}
    </section>
  )
}
