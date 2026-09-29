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
        lang: 'Python',
        stars: 147,
        topics: ['reticulum', 'lxmf', 'lxst'],
        flagship: true,
        logo: '/meshchatx.webp',
      },
      {
        name: 'Reticulum-Go',
        desc: 'The Reticulum network stack, written in Go.',
        lang: 'Go',
        stars: 28,
        topics: ['rns', 'reticulum'],
      },
      {
        name: 'Ren-Browser',
        desc: 'A web browser for the Reticulum network, built on Reticulum-Go.',
        lang: 'Go',
        stars: 19,
        topics: ['reticulum', 'browser'],
      },
      {
        name: 'Ren-TUI',
        desc: 'Terminal client for LXMF messaging and NomadNet pages, written in Odin.',
        lang: 'Odin',
        stars: 2,
        topics: ['lxmf', 'nomadnet'],
      },
      {
        name: 'LXMFy',
        desc: 'Framework for building LXMF bots.',
        lang: 'Python',
        stars: 5,
        mirror: true,
      },
      {
        name: 'LXMFy-Go',
        desc: 'The LXMFy bot framework, written in Go.',
        lang: 'Go',
      },
      {
        name: 'reticulum-go-protocols',
        desc: 'Reticulum message formats and protocols in Go.',
        lang: 'Go',
      },
      {
        name: 'RNS-Filesync',
        desc: 'Peer-to-peer file sync over Reticulum.',
        lang: 'Python',
        stars: 1,
      },
      {
        name: 'rns-page-node',
        desc: 'Serve pages and files over the Reticulum network.',
        lang: 'Python',
        stars: 4,
      },
      {
        name: 'RNS-over-HTTP',
        desc: 'Reach the Reticulum network over plain HTTP.',
        lang: 'Python',
      },
      {
        name: 'websocket-server',
        desc: 'Websocket server for Reticulum-Go.',
        lang: 'Go',
      },
      {
        name: 'lxmf-cli-chat',
        desc: 'Ephemeral LXMF chat for the command line.',
        lang: 'Python',
        stars: 1,
      },
      {
        name: 'meshchatx-issues-bot',
        desc: 'A bot that files issues from LXMF messages.',
        lang: 'Python',
      },
      {
        name: 'pip-rns',
        desc: 'Install Python packages from rngit remotes with pip, pipx, uv or poetry.',
        lang: 'Python',
        stars: 8,
      },
      {
        name: 'Micron-Parser-Go',
        desc: 'Micron markup parser and renderer for Go and the browser.',
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
        lang: 'JavaScript',
        topics: ['offline', 'voice', 'browser'],
      },
      {
        name: 'transcriptasm',
        desc: 'Offline audio transcription in the browser.',
        lang: 'JavaScript',
        topics: ['offline', 'audio', 'browser'],
      },
      {
        name: 'speakasm',
        desc: 'Offline text-to-speech in the browser.',
        lang: 'JavaScript',
        topics: ['offline', 'speech', 'browser'],
      },
      {
        name: 'translatasm',
        desc: 'Offline text translation in the browser.',
        lang: 'JavaScript',
        topics: ['offline', 'translation', 'browser'],
      },
      {
        name: 'bergamot-translator',
        desc: 'The translation engine behind translatasm.',
        fork: true,
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
        lang: 'TypeScript',
        topics: ['devops', 'monitoring', 'status-page'],
      },
      {
        name: 'forge',
        desc: 'Our Forgejo fork. Runs git.quad4.io.',
        fork: true,
        lang: 'Go',
        topics: ['forge', 'git'],
      },
      {
        name: 'ravenguard',
        desc: 'Web application firewall. Blocks bots, scanners and AI scrapers.',
        lang: 'Go',
        logo: '/ravenguard.webp',
      },
      {
        name: 'Athenaeum',
        desc: 'Self-hosted library server for ebooks and audiobooks.',
        lang: 'Go',
      },
      {
        name: 'Badinage',
        desc: 'XMPP chat in the browser.',
        lang: 'TypeScript',
      },
      {
        name: 'arch',
        desc: 'Arch Linux package repository for Quad4 software.',
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
        lang: 'PHP',
      },
      {
        name: 'rss-discovery',
        desc: 'RSS aggregation and feed discovery.',
        lang: 'Go',
      },
      {
        name: 'quickchat',
        desc: 'Lightweight chat for the browser.',
        lang: 'TypeScript',
      },
      {
        name: 'nebula',
        desc: 'Our fork of Nebula, the peer-to-peer overlay network.',
        fork: true,
        lang: 'Go',
      },
      {
        name: 'verdaccio',
        desc: 'Our fork of Verdaccio, a private npm registry.',
        fork: true,
        lang: 'TypeScript',
      },
      {
        name: 'zot',
        desc: 'Our fork of zot, an OCI container registry.',
        fork: true,
        lang: 'Go',
      },
      {
        name: 'beszel',
        desc: 'Our fork of Beszel, a lightweight server monitor.',
        fork: true,
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
        lang: 'Rust',
      },
      {
        name: 'landlockpy',
        desc: 'Python bindings for the Linux Landlock sandbox.',
        lang: 'Python',
        stars: 1,
        topics: ['landlock', 'sandbox'],
      },
      {
        name: 'seccompy',
        desc: 'Python bindings for Linux seccomp-BPF filtering.',
        lang: 'Python',
      },
      {
        name: 'keyctl2',
        desc: 'Python bindings for the Linux kernel keyring.',
        lang: 'Python',
      },
      {
        name: 'purecrypt',
        desc: 'Pure-Python crypto primitives, no dependencies. Not for production use.',
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
        lang: 'Odin',
        topics: ['agent', 'tui', 'llm'],
      },
      {
        name: 'ai',
        desc: 'MCP servers and skills for AI agents.',
        lang: 'Go',
        topics: ['mcp', 'agent-tools'],
      },
      {
        name: 'go-no-telemetry',
        desc: 'Go toolchain fork with telemetry removed and easier source bootstrapping.',
        lang: 'Go',
      },
      {
        name: 'go-legacy-winxp',
        desc: 'Go for Windows XP, extending the go-legacy-win7 fork.',
        lang: 'Go',
        stars: 2,
      },
      {
        name: 'go-haiku',
        desc: 'Go for the Haiku operating system.',
        lang: 'Go',
      },
      {
        name: 'olc-go',
        desc: 'Open Location Code for Go. No dependencies.',
        lang: 'Go',
        topics: ['geocoding', 'zero-allocation'],
      },
      {
        name: 'MGRS-Go',
        desc: 'Military grid coordinate encoding and decoding for Go.',
        lang: 'Go',
      },
      {
        name: 'meshchatx-website',
        desc: 'The meshchatx.com website.',
        lang: 'PHP',
      },
      {
        name: 'reticulum-go-website',
        desc: 'The Reticulum-Go website.',
        lang: 'TypeScript',
      },
      {
        name: 'bzip2',
        desc: 'bzip2 compression for Go, no dependencies.',
        lang: 'Go',
      },
      {
        name: 'cborx',
        desc: 'CBOR encoder and decoder for Python. No dependencies.',
        lang: 'Python',
      },
      {
        name: 'msgpack',
        desc: 'Our maintained MessagePack fork for Go.',
        fork: true,
        lang: 'Go',
      },
      {
        name: 'tagparser',
        desc: 'Struct tag parser for Go.',
        fork: true,
        lang: 'Go',
      },
      {
        name: 'pbt',
        desc: 'Property-based testing for Go.',
        lang: 'Go',
      },
      {
        name: 'acp-go',
        desc: 'Agent Client Protocol library for Go.',
        lang: 'Go',
      },
      {
        name: 'q4tab',
        desc: 'Local code completion from n-gram statistics.',
        lang: 'Go',
      },
      {
        name: 'python-library-template',
        desc: 'Template for typed Python libraries with no dependencies.',
        lang: 'Python',
      },
      {
        name: 'website',
        desc: 'This site. quad4.io.',
        lang: 'TypeScript',
      },
    ],
  },
]

export const osintProjects: Project[] = [
  {
    name: 'yt-osint',
    desc: 'YouTube OSINT tooling for the command line.',
    lang: 'Go',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
    topics: ['osint', 'youtube'],
  },
  {
    name: 'pittacium',
    desc: 'Public email record lookups.',
    lang: 'Go',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
    topics: ['osint', 'email', 'openpgp'],
  },
  {
    name: 'osint-template-go',
    desc: 'Template for building OSINT tools in Go.',
    lang: 'Go',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
  },
  {
    name: 'maigret',
    desc: 'Our fork of Maigret, the username dossier collector.',
    fork: true,
    lang: 'Python',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
  },
  {
    name: 'web-check',
    desc: 'Our fork of web-check, a website analysis tool.',
    fork: true,
    lang: 'TypeScript',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
  },
  {
    name: 'instaloader',
    desc: 'Our fork of instaloader. Downloads Instagram media with metadata.',
    fork: true,
    lang: 'Python',
    org: SITE.osint.org,
    logo: SITE.osint.logo,
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
