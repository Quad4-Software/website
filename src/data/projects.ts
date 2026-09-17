export interface Project {
  name: string
  desc?: string
  lang: string
  stars?: number
  topics?: string[]
  mirror?: boolean
  flagship?: boolean
  logo?: string
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
        stars: 140,
        topics: ['reticulum', 'lxmf', 'lxst'],
        flagship: true,
        logo: '/meshchatx.webp',
      },
      {
        name: 'Reticulum-Go',
        desc: 'The Reticulum network stack, written in Go.',
        lang: 'Go',
        stars: 18,
        topics: ['rns', 'reticulum'],
      },
      {
        name: 'Ren-Browser',
        desc: 'A web browser for the Reticulum network, built on Reticulum-Go.',
        lang: 'Go',
        stars: 17,
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
        stars: 2,
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
        stars: 7,
      },
      {
        name: 'Micron-Parser-Go',
        desc: 'Micron markup parser and renderer for Go and the browser.',
        lang: 'Go',
        stars: 3,
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
    ],
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
