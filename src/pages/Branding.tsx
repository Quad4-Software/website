import { For } from 'solid-js'
import AssetCard from '../components/AssetCard'
import CopyButton from '../components/CopyButton'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import { BRAND_COLORS, BRAND_FONTS, BRAND_GROUPS, BRAND_RULES } from '../data/brand'
import { card, section, sectionBlurb, sectionTitle } from '../lib/styles'
import { css } from '../../styled-system/css'

const assetGrid = css({
  mt: '6',
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
})

const swatchGrid = css({
  mt: '6',
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
})

const swatch = css({
  border: '1px solid',
  borderColor: 'line',
  rounded: 'lg',
  overflow: 'hidden',
})

const swatchMeta = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2',
  px: '3',
  py: '2.5',
})

const typeGrid = css({
  mt: '6',
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
})

const rules = css({
  mt: '4',
  color: 'muted',
  fontSize: 'sm',
  lineHeight: 'relaxed',
  listStyle: 'disc',
  pl: '5',
  display: 'grid',
  gap: '1.5',
})

export default function Branding() {
  return (
    <>
      <PageMeta
        title="Brand"
        description="Quad4 brand assets: the mark, lockups, colors and type. Take what you need."
        path="/branding"
      />

      <PageHeader
        title="Brand"
        blurb="The mark, the lockup, the palette and the type. Download what you need."
      />

      <For each={BRAND_GROUPS}>
        {(g) => (
          <section class={section}>
            <h2 class={sectionTitle}>{g.title}</h2>
            <p class={sectionBlurb}>{g.note}</p>
            <div class={assetGrid}>
              <For each={g.assets}>{(a) => <AssetCard asset={a} />}</For>
            </div>
          </section>
        )}
      </For>

      <section class={section}>
        <h2 class={sectionTitle}>Colors</h2>
        <p class={sectionBlurb}>Void, paper and mist. That is the whole palette.</p>
        <div class={swatchGrid}>
          <For each={BRAND_COLORS}>
            {(c) => (
              <div class={swatch}>
                <div class={css({ h: '5rem' })} style={{ background: c.hex }} />
                <div class={swatchMeta}>
                  <div>
                    <div class={css({ fontFamily: 'mono', fontSize: 'xs', fontWeight: 700 })}>
                      {c.name}
                    </div>
                    <div class={css({ fontFamily: 'mono', fontSize: 'xs', color: 'faint' })}>
                      {c.hex}
                    </div>
                  </div>
                  <CopyButton value={c.hex} />
                </div>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class={section}>
        <h2 class={sectionTitle}>Type</h2>
        <p class={sectionBlurb}>Two families, both vendored locally.</p>
        <div class={typeGrid}>
          <For each={BRAND_FONTS}>
            {(f) => (
              <div class={card}>
                <div
                  class={css({ fontSize: '4xl', fontWeight: 700, mb: '3' })}
                  style={f.mono ? { 'font-family': "'Space Mono', monospace" } : undefined}
                >
                  Aa
                </div>
                <div class={css({ fontFamily: 'mono', fontSize: 'sm', fontWeight: 700 })}>
                  {f.name}
                </div>
                <div class={css({ fontSize: 'sm', color: 'muted' })}>{f.use}</div>
              </div>
            )}
          </For>
        </div>
      </section>

      <section class={section}>
        <h2 class={sectionTitle}>Usage</h2>
        <ul class={rules}>
          <For each={BRAND_RULES}>{(r) => <li>{r}</li>}</For>
        </ul>
      </section>
    </>
  )
}
