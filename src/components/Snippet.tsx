import type { JSX } from 'solid-js'
import CopyButton from './CopyButton'
import { codeBlock } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const label = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'faint',
  mb: '1.5',
  display: 'block',
})

const row = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  mb: '3',
})

interface Props {
  label: string
  value: string
  children?: JSX.Element
}

export default function Snippet(props: Props) {
  return (
    <div>
      <span class={label}>{props.label}</span>
      <div class={row}>
        <code class={cx(codeBlock, css({ flex: '1' }))}>{props.children ?? props.value}</code>
        <CopyButton value={props.value} label={`Copy ${props.label}`} />
      </div>
    </div>
  )
}
