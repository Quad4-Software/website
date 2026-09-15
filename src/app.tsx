import type { ParentProps } from 'solid-js'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Starfield from './components/Starfield'
import { css } from '../styled-system/css'

const skip = css({
  position: 'absolute',
  left: '4',
  top: '-20',
  zIndex: 100,
  bg: 'accent',
  color: 'onAccent',
  fontFamily: 'mono',
  fontSize: 'sm',
  px: '3',
  py: '2',
  rounded: 'md',
  _focus: { top: '4' },
})

export default function App(props: ParentProps) {
  return (
    <div
      class={css({
        position: 'relative',
        zIndex: 1,
        minH: '100dvh',
        display: 'flex',
        flexDir: 'column',
      })}
    >
      <a href="#main" class={skip}>
        Skip to content
      </a>
      <Starfield />
      <Nav />
      <main id="main" class={css({ flex: '1' })}>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
