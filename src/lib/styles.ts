import { css, cva } from '../../styled-system/css'

export const section = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: { base: '8', md: '12' },
})

export const sectionTitle = css({
  fontSize: { base: '2xl', md: '3xl' },
  fontWeight: 600,
  letterSpacing: '-0.02em',
  mb: '3',
})

export const sectionBlurb = css({
  color: 'muted',
  maxW: '38rem',
  fontSize: { base: 'sm', md: 'md' },
  lineHeight: 'relaxed',
})

export const card = css({
  display: 'block',
  bg: 'surfaceAlpha',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'xl',
  p: '5',
  transition: 'border-color 0.2s ease, transform 0.2s ease, background 0.2s ease',
  _hover: {
    borderColor: 'faint',
    transform: 'translateY(-2px)',
  },
})

export const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    fontFamily: 'mono',
    fontSize: 'sm',
    fontWeight: 500,
    px: '5',
    py: '2.5',
    rounded: 'full',
    border: '1px solid',
    borderColor: 'line',
    cursor: 'pointer',
    transition: 'opacity 0.15s ease, border-color 0.15s ease, background 0.15s ease',
    textDecoration: 'none',
  },
  variants: {
    intent: {
      solid: {
        bg: 'accent',
        color: 'onAccent',
        borderColor: 'accent',
        _hover: { opacity: 0.85 },
      },
      ghost: {
        bg: 'transparent',
        color: 'fg',
        _hover: { borderColor: 'faint' },
      },
    },
  },
  defaultVariants: { intent: 'ghost' },
})

export const textLink = css({
  color: 'fg',
  textDecoration: 'underline',
  textDecorationColor: 'faint',
  textUnderlineOffset: '3px',
  transition: 'color 0.15s ease, text-decoration-color 0.15s ease',
  _hover: { color: 'accent', textDecorationColor: 'accent' },
})

export const codeBlock = css({
  fontFamily: 'mono',
  fontSize: { base: 'xs', md: 'sm' },
  bg: 'raised',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'lg',
  px: '4',
  py: '3',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  color: 'fg',
})

export const badge = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'mono',
    fontSize: 'xs',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    px: '2.5',
    py: '1',
    rounded: 'full',
    border: '1px solid',
  },
  variants: {
    tone: {
      solid: { bg: 'accent', color: 'onAccent', borderColor: 'accent' },
      outline: { color: 'muted', borderColor: 'line' },
      dim: { color: 'faint', borderColor: 'line' },
      warn: { color: 'warn', borderColor: 'warn' },
    },
  },
  defaultVariants: { tone: 'outline' },
})
