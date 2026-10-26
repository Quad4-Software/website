import type { Category } from './types'

export const infrastructure: Category = {
  id: 'infrastructure',
  title: 'Self-hosted infrastructure',
  blurb:
    'Identity, finance and ops tools you run on your own hardware. If it phones home, we do not ship it.',
  projects: [
    {
      name: 'arch',
      desc: 'Arch Linux package repository for Quad4 software.',
      updated: '2026-10-26T13:17:12Z',
      license: '0BSD',
      lang: 'Shell',
    },
    {
      name: 'quickchat',
      downloads: 4,
      desc: 'Lightweight chat for the browser.',
      updated: '2026-10-25T23:06:58Z',
      license: '0BSD',
      lang: 'TypeScript',
    },
    {
      name: 'nebula',
      desc: 'Our fork of Nebula, the peer-to-peer overlay network.',
      fork: true,
      updated: '2026-09-14T20:17:23Z',
      license: 'MIT',
      lang: 'Go',
    },
    {
      name: 'Quad4-ID',
      desc: 'Passkey-only OpenID Connect and OAuth 2.0 provider with invites.',
      updated: '2026-10-26T19:49:47Z',
      license: 'BSD-2-Clause',
      lang: 'Go',
      downloads: 25,
      topics: ['oidc', 'passkeys', 'self-hosted'],
    },
    {
      name: 'finance',
      desc: 'Hardened self-hosted finance manager, forked from Securo.',
      fork: true,
      updated: '2026-10-26T20:52:50Z',
      license: 'AGPL-3.0',
      lang: 'Python',
    },
  ],
}
