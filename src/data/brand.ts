export interface BrandAsset {
  name: string
  file: string
  meta: string
  tile?: 'dark' | 'light' | 'none'
}

export interface BrandGroup {
  title: string
  note: string
  assets: BrandAsset[]
}

export const BRAND_GROUPS: readonly BrandGroup[] = [
  {
    title: 'The mark',
    note: 'The Quad4 mark. Light glyph for dark surfaces, dark glyph for light surfaces.',
    assets: [
      { name: 'Mark, light glyph', file: '/quad4-mark.svg', meta: 'svg', tile: 'dark' },
      { name: 'Mark, dark glyph', file: '/quad4-mark-black.svg', meta: 'svg', tile: 'light' },
      { name: 'Mark, light 512', file: '/brand/quad4-mark-512.png', meta: 'png 512', tile: 'dark' },
      {
        name: 'Mark, dark 512',
        file: '/brand/quad4-mark-black-512.png',
        meta: 'png 512',
        tile: 'light',
      },
      {
        name: 'Mark, light 1024',
        file: '/brand/quad4-mark-1024.png',
        meta: 'png 1024',
        tile: 'dark',
      },
      {
        name: 'Mark, dark 1024',
        file: '/brand/quad4-mark-black-1024.png',
        meta: 'png 1024',
        tile: 'light',
      },
    ],
  },
  {
    title: 'Lockup',
    note: 'Mark plus wordmark. Wordmark is set in Space Mono, uppercase, wide tracking.',
    assets: [
      { name: 'Lockup, light', file: '/brand/quad4-lockup.svg', meta: 'svg', tile: 'dark' },
      { name: 'Lockup, dark', file: '/brand/quad4-lockup-black.svg', meta: 'svg', tile: 'light' },
      {
        name: 'Lockup on void',
        file: '/brand/quad4-lockup-on-dark.svg',
        meta: 'svg, #0a0a0b',
        tile: 'dark',
      },
      {
        name: 'Lockup on paper',
        file: '/brand/quad4-lockup-on-light.svg',
        meta: 'svg, #fafafa',
        tile: 'light',
      },
      {
        name: 'Lockup on void',
        file: '/brand/quad4-lockup-on-dark.png',
        meta: 'png 1280',
        tile: 'dark',
      },
      {
        name: 'Lockup on paper',
        file: '/brand/quad4-lockup-on-light.png',
        meta: 'png 1280',
        tile: 'light',
      },
    ],
  },
  {
    title: 'On background',
    note: 'Mark on brand surfaces. Void for dark, paper for light.',
    assets: [
      {
        name: 'Mark on void',
        file: '/quad4-mark-on-black.svg',
        meta: 'svg, #0a0a0b',
        tile: 'dark',
      },
      {
        name: 'Mark on paper',
        file: '/quad4-mark-on-white.svg',
        meta: 'svg, #fafafa',
        tile: 'light',
      },
      {
        name: 'Mark on void',
        file: '/brand/quad4-mark-on-dark.png',
        meta: 'png 1024',
        tile: 'dark',
      },
      {
        name: 'Mark on paper',
        file: '/brand/quad4-mark-on-light.png',
        meta: 'png 1024',
        tile: 'light',
      },
    ],
  },
  {
    title: 'Icons and social',
    note: 'Favicon, touch icon and the social card used for link previews.',
    assets: [
      { name: 'Favicon', file: '/favicon.svg', meta: 'svg', tile: 'dark' },
      { name: 'Touch icon', file: '/apple-touch-icon.png', meta: 'png 180', tile: 'dark' },
      { name: 'Social card', file: '/og.webp', meta: 'webp 1200x630', tile: 'dark' },
    ],
  },
]

export interface BrandColor {
  name: string
  hex: string
  use: string
}

export const BRAND_COLORS: readonly BrandColor[] = [
  { name: 'Void', hex: '#0A0A0B', use: 'dark canvas' },
  { name: 'Void raised', hex: '#16161A', use: 'dark surfaces' },
  { name: 'Mist', hex: '#A1A1AA', use: 'muted text' },
  { name: 'Paper', hex: '#FAFAFA', use: 'light canvas, dark accent' },
  { name: 'Paper soft', hex: '#F4F4F5', use: 'light surfaces, dark text' },
]

export interface BrandFont {
  name: string
  use: string
  mono?: boolean
}

export const BRAND_FONTS: readonly BrandFont[] = [
  { name: 'Space Grotesk', use: 'Headings and body' },
  { name: 'Space Mono', use: 'Code, labels and the wordmark', mono: true },
]

export const BRAND_RULES = [
  'Keep the mark in void black or paper white. No other colors.',
  'Leave clear space around the mark equal to half its width.',
  'Do not stretch, rotate or add effects to the mark.',
]
