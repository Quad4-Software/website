import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  jsxFramework: 'solid',
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  gitignore: true,
  minify: true,

  conditions: {
    extend: {
      light: '[data-theme=light] &',
      dark: '[data-theme=dark] &',
    },
  },

  theme: {
    extend: {
      tokens: {
        fonts: {
          body: {
            value:
              '"Space Grotesk Variable", "Space Grotesk", system-ui, -apple-system, sans-serif',
          },
          mono: { value: '"Space Mono", ui-monospace, "SFMono-Regular", monospace' },
        },
        colors: {
          void: {
            950: { value: '#050506' },
            900: { value: '#0a0a0b' },
            850: { value: '#101013' },
            800: { value: '#16161a' },
            700: { value: '#1f1f24' },
            600: { value: '#2a2a31' },
            500: { value: '#3a3a42' },
          },
          mist: {
            600: { value: '#52525b' },
            500: { value: '#71717a' },
            400: { value: '#a1a1aa' },
            300: { value: '#d4d4d8' },
          },
          paper: {
            50: { value: '#fafafa' },
            100: { value: '#f4f4f5' },
            200: { value: '#e9e9ec' },
            300: { value: '#d9d9de' },
          },
        },
      },
      semanticTokens: {
        colors: {
          canvas: { value: { _light: '{colors.paper.50}', _dark: '{colors.void.900}' } },
          canvasAlpha: {
            value: { _light: 'rgba(250,250,250,0.82)', _dark: 'rgba(10,10,11,0.78)' },
          },
          surface: { value: { _light: '#ffffff', _dark: '{colors.void.850}' } },
          surfaceAlpha: {
            value: { _light: 'rgba(255,255,255,0.88)', _dark: 'rgba(16,16,19,0.86)' },
          },
          raised: { value: { _light: '{colors.paper.100}', _dark: '{colors.void.800}' } },
          fg: { value: { _light: '{colors.void.900}', _dark: '{colors.paper.100}' } },
          muted: { value: { _light: '{colors.mist.600}', _dark: '{colors.mist.400}' } },
          faint: { value: { _light: '{colors.mist.600}', _dark: '#8f8f98' } },
          line: { value: { _light: '{colors.paper.300}', _dark: '{colors.void.700}' } },
          accent: { value: { _light: '{colors.void.900}', _dark: '{colors.paper.50}' } },
          onAccent: { value: { _light: '{colors.paper.50}', _dark: '{colors.void.900}' } },
          glow: {
            value: { _light: 'rgba(10,10,11,0.35)', _dark: 'rgba(255,255,255,0.45)' },
          },
          star: { value: { _light: 'rgba(10,10,11,0.26)', _dark: 'rgba(255,255,255,0.9)' } },
          warn: { value: { _light: '#c2410c', _dark: '#fb923c' } },
        },
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        dashFlow: {
          to: { strokeDashoffset: '-400' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        drift: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-4%, 2%, 0)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },

  globalCss: {
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      overflowX: 'clip',
      bg: 'canvas',
      color: 'fg',
      fontFamily: 'body',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
    },
    '::selection': {
      bg: 'fg',
      color: 'canvas',
    },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: 'fg',
      outlineOffset: '3px',
    },
    '@media (prefers-reduced-motion: reduce)': {
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
      },
      html: {
        scrollBehavior: 'auto',
      },
    },
  },
})
