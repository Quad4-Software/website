import { Clipboard } from '@ark-ui/solid/clipboard'
import { Check, Copy } from 'lucide-solid'
import { css } from '../../styled-system/css'

const btn = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'muted',
  px: '3',
  py: '1.5',
  rounded: 'md',
  border: '1px solid',
  borderColor: 'line',
  cursor: 'pointer',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  _hover: { color: 'fg', borderColor: 'faint' },
})

interface Props {
  value: string
  label?: string
}

export default function CopyButton(props: Props) {
  return (
    <Clipboard.Root value={props.value}>
      <Clipboard.Trigger class={btn} aria-label={props.label ?? 'Copy to clipboard'}>
        <Clipboard.Indicator
          copied={
            <>
              <Check size={13} aria-hidden="true" /> Copied
            </>
          }
        >
          <Copy size={13} aria-hidden="true" /> Copy
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
