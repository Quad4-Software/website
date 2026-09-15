import type { SimpleIcon as SimpleIconData } from 'simple-icons'

interface Props {
  icon: SimpleIconData
  size?: number
  class?: string
  colored?: boolean
  decorative?: boolean
}

export default function SimpleIcon(props: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size ?? 16}
      height={props.size ?? 16}
      class={props.class}
      fill={props.colored ? `#${props.icon.hex}` : 'currentColor'}
      role={props.decorative ? 'presentation' : 'img'}
      aria-hidden={props.decorative ? 'true' : undefined}
      aria-label={props.decorative ? undefined : props.icon.title}
    >
      <path d={props.icon.path} />
    </svg>
  )
}
