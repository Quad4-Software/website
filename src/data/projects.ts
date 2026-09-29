import { SITE } from '../config/site'

export interface Project {
  name: string
  desc?: string
  lang: string
  stars?: number
  topics?: string[]
  mirror?: boolean
  fork?: boolean
  flagship?: boolean
  logo?: string
  org?: string
  updated?: string
  license?: string
}

export interface Category {
  id: string
  title: string
  blurb: string
  projects: Project[]
}

export const categories: Category[] = [
  {
    id: 'mesh',
    title: 'Mesh networking',
    blurb:
      'Software built on the Reticulum network. Messaging, browsing and file sync that work without the regular internet.',
    projects: [
      {
        name: 'MeshChatX',
        desc: 'Messaging, calls and NomadNet pages over the Reticulum network.',
        updated: '2026-09-29T08:56:13Z',
        license: '0BSD',
        lang: 'Python',
        stars: 147,
        topics: ['reticulum', 'lxmf', 'lxst'],
        flagship: true,
        logo: '/meshchatx.webp',
      },
      {
        name: 'Reticulum-Go',
        desc: 'The Reticulum network stack, written in Go.',
        updated: '2026-09-28T13:19:35Z',
        license: 'Reticulum',
        lang: 'Go',
        stars: 28,
        topics: ['rns', 'reticulum'],
      },
      {
        name: 'Ren-Browser',
        desc: 'A web browser for the Reticulum network, built on Reticulum-Go.',
        updated: '2026-09-27T21:36:14Z',
        license: 'MIT',
        lang: 'Go',
        stars: 19,
        topics: ['reticulum', 'browser'],
      },
      {
        name: 'Ren-TUI',
        desc: 'Terminal client for LXMF messaging and NomadNet pages, written in Odin.',
        updated: '2026-09-28T16:58:54Z',
        license: '0BSD',
        lang: 'Odin',
        stars: 2,
        topics: ['lxmf', 'nomadnet'],
      },
      {
        name: 'LXMFy',
        desc: 'Framework for building LXMF bots.',
        updated: '2026-09-26T22:05:38Z',
        license: '0BSD',
        lang: 'Python',
        stars: 5,
        mirror: true,
      },
      {
        name: 'LXMFy-Go',
        desc: 'The LXMFy bot framework, written in Go.',
        updated: '2026-07-12T21:31:39Z',
        lang: 'Go',
      },
      {
        name: 'reticulum-go-protocols',
        desc: 'Reticulum message formats and protocols in Go.',
        updated: '2026-09-28T01:00:58Z',
        license: 'Reticulum',
        lang: 'Go',
      },
      {
        name: 'RNS-Filesync',
        desc: 'Peer-to-peer file sync over Reticulum.',
        updated: '2026-09-14T17:08:28Z',
        license: 'BSD-2-Clause',
        lang: 'Python',
        stars: 1,
      },
      {
        name: 'rns-page-node',
        desc: 'Serve pages and files over the Reticulum network.',
        updated: '2026-09-14T01:31:12Z',
        license: 'GPL-3.0',
        lang: 'Python',
        stars: 4,
      },
      {
        name: 'RNS-over-HTTP',
        desc: 'Reach the Reticulum network over plain HTTP.',
        updated: '2026-09-14T01:46:22Z',
        license: 'MIT',
        lang: 'Python',
      },
      {
        name: 'websocket-server',
        desc: 'Websocket server for Reticulum-Go.',
        updated: '2026-09-14T16:10:37Z',
        license: 'BSD-3-Clause',
        lang: 'Go',
      },
      {
        name: 'lxmf-cli-chat',
        desc: 'Ephemeral LXMF chat for the command line.',
        updated: '2026-09-14T01:56:47Z',
        license: '0BSD',
        lang: 'Python',
        stars: 1,
      },
      {
        name: 'meshchatx-issues-bot',
        desc: 'A bot that files issues from LXMF messages.',
        updated: '2026-09-28T19:47:42Z',
        license: '0BSD',
        lang: 'Python',
      },
      {
        name: 'pip-rns',
        desc: 'Install Python packages from rngit remotes with pip, pipx, uv or poetry.',
        updated: '2026-09-29T03:53:28Z',
        license: 'BSD-2-Clause',
        lang: 'Python',
        stars: 8,
      },
      {
        name: 'Micron-Parser-Go',
        desc: 'Micron markup parser and renderer for Go and the browser.',
        updated: '2026-09-21T13:20:39Z',
        license: '0BSD',
        lang: 'Go',
        stars: 4,
        topics: ['micron', 'parser'],
      },
    ],
  },
  {
    id: 'offline-web',
    title: 'Offline-first web',
    blurb:
      'Apps that run dictation, transcription and translation entirely in your browser. Nothing leaves the device.',
    projects: [
      {
        name: 'dictationasm',
        desc: 'Offline voice dictation that runs entirely in the browser.',
        updated: '2026-09-19T05:32:49Z',
        license: '0BSD',
        lang: 'JavaScript',
        topics: ['offline', 'voice', 'browser'],
      },
      {
        name: 'transcriptasm',
        desc: 'Offline audio transcription in the browser.',
        updated: '2026-09-18T14:08:03Z',
        license: '0BSD',
        lang: 'JavaScript',
        topics: ['offline', 'audio', 'browser'],
      },
      {
        name: 'speakasm',
        desc: 'Offline text-to-speech in the browser.',
        updated: '2026-09-18T12:36:43Z',
        license: '0BSD',
        lang: 'JavaScript',
        topics: ['offline', 'speech', 'browser'],
      },
      {
        name: 'translatasm',
        desc: 'Offline text translation in the browser.',
        updated: '2026-09-18T04:17:05Z',
        license: '0BSD',
        lang: 'JavaScript',
        topics: ['offline', 'translation', 'browser'],
      },
      {
        name: 'bergamot-translator',
        desc: 'The translation engine behind translatasm.',
        fork: true,
        updated: '2026-09-25T22:48:35Z',
        license: 'MPL-2.0',
        lang: 'C++',
      },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Self-hosted infrastructure',
    blurb:
      'Platforms, forges and firewalls you run on your own hardware. If it phones home, we do not ship it.',
    projects: [
      {
        name: 'Wharfinger',
        desc: 'Monitoring, status pages and deployments on your own hardware.',
        updated: '2026-09-28T07:03:36Z',
        license: '0BSD',
        lang: 'TypeScript',
        topics: ['devops', 'monitoring', 'status-page'],
      },
      {
        name: 'forge',
        desc: 'Our Forgejo fork. Runs git.quad4.io.',
        fork: true,
        updated: '2026-09-29T04:15:45Z',
        license: 'GPL-3.0',
        lang: 'Go',
        topics: ['forge', 'git'],
      },
      {
        name: 'ravenguard',
        desc: 'Web application firewall. Blocks bots, scanners and AI scrapers.',
        updated: '2026-09-29T03:37:54Z',
        license: '0BSD',
        lang: 'Go',
        logo: '/ravenguard.webp',
      },
      {
        name: 'Athenaeum',
        desc: 'Self-hosted library server for ebooks and audiobooks.',
        updated: '2026-09-28T13:55:12Z',
        license: 'MIT',
        lang: 'Go',
      },
      {
        name: 'Badinage',
        desc: 'XMPP chat in the browser.',
        updated: '2026-09-26T20:58:47Z',
        license: '0BSD',
        lang: 'TypeScript',
      },
      {
        name: 'arch',
        desc: 'Arch Linux package repository for Quad4 software.',
        updated: '2026-09-28T13:17:19Z',
        license: '0BSD',
        lang: 'Shell',
      },
      {
        name: 'packages',
        desc: 'Build files for Quad4 packages.',
        lang: 'Other',
      },
      {
        name: 'VoidBin',
        desc: 'Our hardened PrivateBin fork. Encrypted pastebin behind ravenguard.',
        fork: true,
        updated: '2026-09-21T21:41:42Z',
        lang: 'PHP',
      },
      {
        name: 'rss-discovery',
        desc: 'RSS aggregation and feed discovery.',
        updated: '2026-09-28T00:31:00Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'quickchat',
        desc: 'Lightweight chat for the browser.',
        updated: '2026-09-23T07:04:35Z',
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
        name: 'verdaccio',
        desc: 'Our fork of Verdaccio, a private npm registry.',
        fork: true,
        updated: '2026-09-22T12:24:05Z',
        license: 'MIT',
        lang: 'TypeScript',
      },
      {
        name: 'zot',
        desc: 'Our fork of zot, an OCI container registry.',
        fork: true,
        updated: '2026-09-23T00:51:05Z',
        license: 'Apache-2.0',
        lang: 'Go',
      },
      {
        name: 'beszel',
        desc: 'Our fork of Beszel, a lightweight server monitor.',
        fork: true,
        updated: '2026-09-20T22:05:45Z',
        license: 'MIT',
        lang: 'Go',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security tooling',
    blurb: 'Libraries and tools for sandboxing, crypto and defensive work.',
    projects: [
      {
        name: 'argus',
        desc: 'Security checks and hardening in a single Rust binary.',
        updated: '2026-09-29T01:56:10Z',
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
  },
  {
    id: 'toolchains',
    title: 'Toolchains and libraries',
    blurb:
      'Compilers, parsers and utilities, including Go forks with no telemetry and support for older systems.',
    projects: [
      {
        name: 'nullray',
        desc: 'Lightweight AI agent for the terminal.',
        updated: '2026-09-29T08:29:32Z',
        license: 'QSL',
        lang: 'Odin',
        topics: ['agent', 'tui', 'llm'],
      },
      {
        name: 'ai',
        desc: 'MCP servers and skills for AI agents.',
        updated: '2026-09-27T18:04:58Z',
        license: '0BSD',
        lang: 'Go',
        topics: ['mcp', 'agent-tools'],
      },
      {
        name: 'go-no-telemetry',
        desc: 'Go toolchain fork with telemetry removed and easier source bootstrapping.',
        updated: '2026-09-14T19:10:29Z',
        license: 'BSD-3-Clause',
        lang: 'Go',
      },
      {
        name: 'go-legacy-winxp',
        desc: 'Go for Windows XP, extending the go-legacy-win7 fork.',
        updated: '2026-09-14T20:38:05Z',
        license: 'BSD-3-Clause',
        lang: 'Go',
        stars: 2,
      },
      {
        name: 'go-haiku',
        desc: 'Go for the Haiku operating system.',
        updated: '2026-09-14T19:37:50Z',
        license: 'BSD-3-Clause',
        lang: 'Go',
      },
      {
        name: 'olc-go',
        desc: 'Open Location Code for Go. No dependencies.',
        updated: '2026-09-21T05:29:09Z',
        license: '0BSD',
        lang: 'Go',
        topics: ['geocoding', 'zero-allocation'],
      },
      {
        name: 'MGRS-Go',
        desc: 'Military grid coordinate encoding and decoding for Go.',
        updated: '2026-09-28T14:38:58Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'meshchatx-website',
        desc: 'The meshchatx.com website.',
        updated: '2026-09-28T07:56:45Z',
        lang: 'PHP',
      },
      {
        name: 'reticulum-go-website',
        desc: 'The Reticulum-Go website.',
        updated: '2026-09-19T13:10:23Z',
        license: 'Reticulum',
        lang: 'TypeScript',
      },
      {
        name: 'bzip2',
        desc: 'bzip2 compression for Go, no dependencies.',
        updated: '2026-09-21T08:19:54Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'cborx',
        desc: 'CBOR encoder and decoder for Python. No dependencies.',
        updated: '2026-09-26T22:30:44Z',
        license: '0BSD',
        lang: 'Python',
      },
      {
        name: 'msgpack',
        desc: 'Our maintained MessagePack fork for Go.',
        fork: true,
        updated: '2026-09-21T22:39:50Z',
        license: 'BSD-2-Clause',
        lang: 'Go',
      },
      {
        name: 'tagparser',
        desc: 'Struct tag parser for Go.',
        fork: true,
        updated: '2026-09-21T16:50:24Z',
        license: 'BSD-2-Clause',
        lang: 'Go',
      },
      {
        name: 'pbt',
        desc: 'Property-based testing for Go.',
        updated: '2026-09-21T09:49:08Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'acp-go',
        desc: 'Agent Client Protocol library for Go.',
        updated: '2026-09-23T23:53:28Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'q4tab',
        desc: 'Local code completion from n-gram statistics.',
        updated: '2026-09-25T21:12:55Z',
        license: '0BSD',
        lang: 'Go',
      },
      {
        name: 'python-library-template',
        desc: 'Template for typed Python libraries with no dependencies.',
        updated: '2026-09-22T11:47:57Z',
        license: '0BSD',
        lang: 'Python',
      },
      {
        name: 'website',
        desc: 'This site. quad4.io.',
        updated: '2026-09-29T09:15:31Z',
        lang: 'TypeScript',
      },
    ],
  },
]

export const Projects: Project[] = [
  {
    name: 'yt-',
    desc: 'YouTube  tooling for the command line.',
    updated: '2026-09-28T23:03:39Z',
    license: '0BSD',
    lang: 'Go',
    org: SITE..org,
    logo: SITE..logo,
    topics: ['', 'youtube'],
  },
  {
    name: 'pittacium',
    desc: 'Public email record lookups.',
    updated: '2026-09-28T22:43:58Z',
    license: '0BSD',
    lang: 'Go',
    org: SITE..org,
    logo: SITE..logo,
    topics: ['', 'email', 'openpgp'],
  },
  {
    name: '-template-go',
    desc: 'Template for building  tools in Go.',
    updated: '2026-09-28T14:35:29Z',
    license: '0BSD',
    lang: 'Go',
    org: SITE..org,
    logo: SITE..logo,
  },
  {
    name: '',
    desc: 'Our fork of , the  collector.',
    fork: true,
    updated: '2026-09-28T16:46:34Z',
    license: 'MIT',
    lang: 'Python',
    org: SITE..org,
    logo: SITE..logo,
  },
  {
    name: '',
    desc: 'Our fork of , a website analysis tool.',
    fork: true,
    updated: '2026-09-28T16:06:31Z',
    license: 'MIT',
    lang: 'TypeScript',
    org: SITE..org,
    logo: SITE..logo,
  },
  {
    name: '',
    desc: 'Our fork of . Downloads  media with metadata.',
    fork: true,
    updated: '2026-09-06T18:20:52Z',
    license: 'MIT',
    lang: 'Python',
    org: SITE..org,
    logo: SITE..logo,
  },
]

export const featuredNames = [
  'MeshChatX',
  'Reticulum-Go',
  'Ren-Browser',
  'translatasm',
  'Wharfinger',
  'nullray',
  'pip-rns',
]

export const featured: Project[] = featuredNames
  .map((n) => categories.flatMap((c) => c.projects).find((p) => p.name === n))
  .filter((p): p is Project => p !== undefined)

export const repoCount = categories.reduce((n, c) => n + c.projects.length, 0)

export const langCount = new Set(
  categories.flatMap((c) => c.projects.map((p) => p.lang)).filter((l) => l !== 'Other'),
).size
