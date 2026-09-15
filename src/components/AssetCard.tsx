import { Download } from 'lucide-solid'
import type { BrandAsset } from '../data/brand'
import { button, card } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const tile = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  h: '9rem',
  rounded: 'lg',
  border: '1px solid',
  borderColor: 'line',
  overflow: 'hidden',
  mb: '3',
})

const tileBg = {
  dark: css({ bg: 'void.900' }),
  light: css({ bg: 'paper.50' }),
  none: css({ bg: 'raised' }),
}

const assetName = css({ fontFamily: 'mono', fontSize: 'sm', fontWeight: 700 })
const assetMeta = css({ fontFamily: 'mono', fontSize: 'xs', color: 'faint' })

export default function AssetCard(props: { asset: BrandAsset }) {
  return (
    <div class={card}>
      <div class={cx(tile, tileBg[props.asset.tile ?? 'none'])}>
        <img
          src={props.asset.file}
          alt={props.asset.name}
          loading="lazy"
          class={css({ maxW: '78%', maxH: '78%', objectFit: 'contain' })}
        />
      </div>
      <div
        class={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3',
        })}
      >
        <div>
          <div class={assetName}>{props.asset.name}</div>
          <div class={assetMeta}>{props.asset.meta}</div>
        </div>
        <a
          href={props.asset.file}
          download={props.asset.file.split('/').pop()}
          aria-label={`Download ${props.asset.name}`}
          class={cx(button(), css({ px: '3', py: '2' }))}
        >
          <Download size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
