import { For } from 'solid-js'
import { Check, CircleAlert, Scale, X } from 'lucide-solid'
import CopyButton from '../components/CopyButton'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import { LICENSES } from '../data/licenses'
import type { License } from '../data/licenses'
import { badge, toneAging, toneFresh, toneStale } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const stack = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  pb: { base: '10', md: '14' },
  display: 'grid',
  gap: '5',
})

const licenseCard = css({
  bg: 'surfaceAlpha',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  p: { base: '5', md: '7' },
})

const cardHead = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
  mb: '1',
})

const cardName = css({
  fontFamily: 'mono',
  fontWeight: 700,
  fontSize: 'lg',
  letterSpacing: '0.02em',
})

const aka = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'muted',
  mb: '3',
})

const cardDesc = css({
  fontSize: 'sm',
  color: 'muted',
  lineHeight: 'relaxed',
  mb: '4',
  maxW: '44rem',
})

const traitRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
  mb: '5',
})

const facetGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
  gap: '4',
  mb: '5',
})

const facetCard = css({
  border: '1px solid',
  borderColor: 'line',
  rounded: 'lg',
  p: '4',
})

const facetTitle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5',
  fontFamily: 'mono',
  fontSize: 'xs',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  mb: '3',
})

const facetList = css({
  m: '0',
  p: '0',
  listStyle: 'none',
  display: 'grid',
  gap: '1.5',
  fontSize: 'sm',
  color: 'muted',
})

const licenseText = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  lineHeight: 'relaxed',
  color: 'muted',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  bg: 'raised',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'lg',
  p: '4',
})

const cardFoot = css({
  display: 'flex',
  justifyContent: 'flex-end',
  mt: '4',
})

const facets = (l: License) => [
  { title: 'Permissions', items: l.permissions, icon: Check, tone: toneFresh },
  { title: 'Conditions', items: l.conditions, icon: CircleAlert, tone: toneAging },
  { title: 'Limitations', items: l.limitations, icon: X, tone: toneStale },
]

export default function Licenses() {
  return (
    <>
      <PageMeta
        title="Licenses"
        description="The licenses Quad4 software ships under, in full. The Quad4 Source License (an anti-grifter license) converts each version to 0BSD two years after release."
        path="/licenses"
      />

      <PageHeader
        title="Licenses"
        blurb="The licenses our software ships under, reproduced in full. Each repo's LICENSE file states which terms apply to that project."
      />

      <div class={stack}>
        <For each={LICENSES}>
          {(l) => (
            <article class={licenseCard}>
              <div class={cardHead}>
                <Scale size={18} aria-hidden="true" />
                <span class={cardName}>
                  {l.name}, Version {l.version}
                </span>
                <span class={badge({ tone: 'solid' })}>{l.abbreviation}</span>
              </div>
              {l.aka ? <div class={aka}>aka {l.aka}</div> : null}
              <p class={cardDesc}>{l.summary}</p>
              <div class={traitRow}>
                <For each={l.traits}>{(t) => <span class={badge()}>{t}</span>}</For>
              </div>
              <div class={facetGrid}>
                <For each={facets(l)}>
                  {(f) => (
                    <div class={facetCard}>
                      <div class={cx(facetTitle, f.tone)}>
                        <f.icon size={13} aria-hidden="true" />
                        {f.title}
                      </div>
                      <ul class={facetList}>
                        <For each={f.items}>{(i) => <li>{i}</li>}</For>
                      </ul>
                    </div>
                  )}
                </For>
              </div>
              <pre class={licenseText}>{l.text}</pre>
              <div class={cardFoot}>
                <CopyButton value={l.text} label={`Copy ${l.abbreviation} text`} />
              </div>
            </article>
          )}
        </For>
      </div>
    </>
  )
}
