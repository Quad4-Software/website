import type { Category } from './types'

export const security: Category = {
  id: 'security',
  title: 'Security tooling',
  blurb: 'Libraries and tools for sandboxing, crypto and defensive work.',
  projects: [
    {
      name: 'argus',
      desc: 'Security checks and hardening in a single Rust binary.',
      updated: '2026-09-30T20:39:48Z',
      license: 'MIT-0',
      lang: 'Rust',
    },
    {
      name: 'landlockpy',
      desc: 'Python bindings for the Linux Landlock sandbox.',
      updated: '2026-09-26T21:51:44Z',
      license: '0BSD',
      lang: 'Python',
      stars: 1,
      topics: ['landlock', 'sandbox'],
    },
    {
      name: 'seccompy',
      desc: 'Python bindings for Linux seccomp-BPF filtering.',
      updated: '2026-09-28T23:47:51Z',
      license: '0BSD',
      lang: 'Python',
    },
    {
      name: 'keyctl2',
      desc: 'Python bindings for the Linux kernel keyring.',
      updated: '2026-09-26T22:55:03Z',
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
