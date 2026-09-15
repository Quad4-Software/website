import { Moon, Sun } from 'lucide-solid'
import { toggleTheme, useTheme } from '../lib/theme'
import { css } from '../../styled-system/css'

const btn = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '8',
  h: '8',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line',
  color: 'muted',
  cursor: 'pointer',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  _hover: { color: 'fg', borderColor: 'faint' },
})

export default function ThemeToggle() {
  const theme = useTheme()
  const dark = () => theme() === 'dark'
  return (
    <button
      type="button"
      class={btn}
      onClick={toggleTheme}
      aria-label={dark() ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark() ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark() ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
    </button>
  )
}
