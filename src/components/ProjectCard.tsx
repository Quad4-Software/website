import { For, Show } from 'solid-js'
import { ArrowUpRight, Star } from 'lucide-solid'
import OrbitGlyph from './OrbitGlyph'
import { repoUrl } from '../config/site'
import { langColor } from '../data/langs'
import type { Project } from '../data/projects'
import { card } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const flagshipCard = css({ gridColumn: '1 / -1' })

const flagshipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '5',
})

const name = css({
  fontWeight: 600,
  fontSize: 'md',
  letterSpacing: '-0.01em',
})

const flagshipName = css({
  fontWeight: 600,
  fontSize: 'lg',
  letterSpacing: '-0.01em',
})

const desc = css({
  mt: '2',
  fontSize: 'sm',
  color: 'muted',
  lineHeight: 'relaxed',
  minH: '3.75rem',
})

const meta = css({
  mt: '4',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
})

const lang = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
})

const langDot = css({
  w: '2.5',
  h: '2.5',
  rounded: 'full',
  flexShrink: 0,
})

const stars = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
})

const topic = css({
  px: '2',
  py: '0.5',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line',
})

const mirrorTag = css({
  ml: '2',
  fontFamily: 'mono',
  fontSize: 'xs',
  fontWeight: 400,
  color: 'faint',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'full',
  px: '2',
  py: '0.5',
  verticalAlign: 'middle',
})

const flagshipLogo = css({
  w: '12',
  h: '12',
  rounded: 'lg',
  flexShrink: 0,
})

const smallLogo = css({
  w: '7',
  h: '7',
  objectFit: 'contain',
  flexShrink: 0,
})

export default function ProjectCard(props: { project: Project }) {
  const p = () => props.project

  const icon = (size: number) =>
    p().logo ? (
      <img
        src={p().logo}
        alt=""
        width={size}
        height={size}
        class={size > 24 ? flagshipLogo : smallLogo}
      />
    ) : (
      <OrbitGlyph seed={p().name} size={size} />
    )

  const head = (
    <div
      class={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3',
      })}
    >
      <span class={css({ display: 'inline-flex', alignItems: 'center', gap: '2.5', minW: '0' })}>
        {icon(24)}
        <span class={name}>
          {p().name}
          {p().mirror ? <span class={mirrorTag}>mirror</span> : null}
        </span>
      </span>
      <ArrowUpRight size={15} aria-hidden="true" class={css({ color: 'faint', flexShrink: 0 })} />
    </div>
  )

  const body = (
    <>
      <p class={desc}>{p().desc ?? 'Details coming soon.'}</p>
      <div class={meta}>
        <span class={lang}>
          <span class={langDot} style={{ background: langColor(p().lang) }} />
          {p().lang}
        </span>
        {p().stars ? (
          <span class={stars}>
            <Star size={12} aria-hidden="true" />
            {p().stars}
          </span>
        ) : null}
        <For each={p().topics?.slice(0, 3)}>{(t) => <span class={topic}>{t}</span>}</For>
      </div>
    </>
  )

  return (
    <Show
      when={p().flagship}
      fallback={
        <a href={repoUrl(p().name)} target="_blank" rel="noopener noreferrer" class={card}>
          {head}
          {body}
        </a>
      }
    >
      <a
        href={repoUrl(p().name)}
        target="_blank"
        rel="noopener noreferrer"
        class={cx(card, flagshipCard)}
      >
        <div class={flagshipRow}>
          {icon(48)}
          <div class={css({ flex: '1', minW: '0' })}>
            <div
              class={css({
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '3',
              })}
            >
              <span class={flagshipName}>
                {p().name}
                {p().mirror ? <span class={mirrorTag}>mirror</span> : null}
              </span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                class={css({ color: 'faint', flexShrink: 0, mt: '1' })}
              />
            </div>
            <p class={cx(desc, css({ minH: '0' }))}>{p().desc}</p>
            <div class={meta}>
              <span class={lang}>
                <span class={langDot} style={{ background: langColor(p().lang) }} />
                {p().lang}
              </span>
              {p().stars ? (
                <span class={stars}>
                  <Star size={12} aria-hidden="true" />
                  {p().stars}
                </span>
              ) : null}
              <For each={p().topics}>{(t) => <span class={topic}>{t}</span>}</For>
            </div>
          </div>
        </div>
      </a>
    </Show>
  )
}
