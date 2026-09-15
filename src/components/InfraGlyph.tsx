import { Match, Switch } from 'solid-js'
import GithubIcon from './GithubIcon'
import Mark from './Mark'
import SimpleIcon from './SimpleIcon'
import type { InfraIcon } from '../data/infra'

interface Props {
  icon: InfraIcon
  size?: number
  svg?: boolean
  class?: string
}

export default function InfraGlyph(props: Props) {
  const size = () => props.size ?? 20
  const half = () => size() / 2

  return (
    <Switch>
      <Match when={props.icon.kind === 'mark'}>
        {props.svg ? (
          <g transform={`translate(${-half()} ${-half()})`}>
            <Mark size={size()} decorative />
          </g>
        ) : (
          <Mark size={size()} decorative />
        )}
      </Match>
      <Match when={props.icon.kind === 'github'}>
        {props.svg ? (
          <g transform={`translate(${-half()} ${-half()})`}>
            <GithubIcon size={size()} decorative />
          </g>
        ) : (
          <GithubIcon size={size()} decorative />
        )}
      </Match>
      <Match when={props.icon.kind === 'si' ? props.icon : undefined}>
        {(ic) =>
          props.svg ? (
            <g transform={`translate(${-half()} ${-half()})`}>
              <SimpleIcon icon={ic().icon} size={size()} colored decorative />
            </g>
          ) : (
            <SimpleIcon icon={ic().icon} size={size()} colored decorative />
          )
        }
      </Match>
      <Match when={props.icon.kind === 'img' ? props.icon : undefined}>
        {(ic) =>
          props.svg ? (
            <image
              href={ic().src}
              x={-half()}
              y={-half()}
              width={size()}
              height={size()}
              preserveAspectRatio="xMidYMid meet"
            />
          ) : (
            <img src={ic().src} alt="" width={size()} height={size()} class={props.class} />
          )
        }
      </Match>
      <Match when={props.icon.kind === 'lucide' ? props.icon : undefined}>
        {(ic) => {
          const Icon = ic().icon
          return props.svg ? (
            <g transform={`translate(${-half()} ${-half()})`}>
              <Icon size={size()} aria-hidden="true" />
            </g>
          ) : (
            <Icon size={size()} aria-hidden="true" class={props.class} />
          )
        }}
      </Match>
    </Switch>
  )
}
