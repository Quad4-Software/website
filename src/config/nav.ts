import { SITE } from './site'

export interface NavLink {
  href: string
  label: string
  external?: boolean
  icon?: string
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/git', label: 'Git' },
  { href: '/security', label: 'Security' },
  { href: '/contact', label: 'Contact' },
]

export const ROUTES = ['/', '/projects', '/git', '/security', '/contact', '/branding'] as const

export interface FooterSection {
  title: string
  links: readonly NavLink[]
}

export const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: 'Site',
    links: [{ href: '/', label: 'Home' }, ...NAV_LINKS, { href: '/branding', label: 'Branding' }],
  },
  {
    title: 'Source',
    links: [
      { href: SITE.links.github, label: 'GitHub', external: true, icon: 'github' },
      { href: SITE.links.forge, label: 'git.quad4.io', external: true, icon: 'mark' },
      {
        href: SITE.links.meshchatx,
        label: 'meshchatx.com',
        external: true,
        icon: '/meshchatx.webp',
      },
    ],
  },
]
