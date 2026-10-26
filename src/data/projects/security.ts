import type { Category } from './types'

export const security: Category = {
  id: 'security',
  title: 'Security tooling',
  blurb: 'Libraries and tools for sandboxing, crypto and defensive work.',
  projects: [
    {
      name: 'argus',
      downloads: 64,
      desc: 'Security checks and hardening in a single Rust binary.',
      updated: '2026-10-26T12:32:03Z',
      license: 'MIT-0',
      lang: 'Rust',
    },
    {
      name: 'landlockpy',
      desc: 'Python bindings for the Linux Landlock sandbox.',
      updated: '2026-10-20T10:14:54Z',
      license: '0BSD',
      lang: 'Python',
      stars: 1,
      topics: ['landlock', 'sandbox'],
      downloads: 1,
    },
    {
      name: 'seccompy',
      downloads: 2,
      desc: 'Python bindings for Linux seccomp-BPF filtering.',
      updated: '2026-10-20T06:14:40Z',
      license: '0BSD',
      lang: 'Python',
    },
    {
      name: 'keyctl2',
      desc: 'Python bindings for the Linux kernel keyring.',
      updated: '2026-10-20T13:06:06Z',
      license: '0BSD',
      lang: 'Python',
    },
    {
      name: 'purecrypt',
      desc: 'Pure-Python crypto primitives, no dependencies. Not for production use.',
      updated: '2026-09-27T12:09:58Z',
      license: '0BSD',
      lang: 'Python',
    },
  ],
}
