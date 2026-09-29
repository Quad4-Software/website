import { For } from 'solid-js'
import { Scale } from 'lucide-solid'
import CopyButton from '../components/CopyButton'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import { LICENSES } from '../data/licenses'
import { badge } from '../lib/styles'
import { css } from '../../styled-system/css'

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
  maxW: '44rem',
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

export default function Licenses() {
  return (
    <>
      <PageMeta
        title="Licenses"
        description="The licenses Quad4 software ships under, in full. The Quad4 Source License converts each version to 0BSD two years after release."
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
              <p class={cardDesc}>{l.summary}</p>
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
