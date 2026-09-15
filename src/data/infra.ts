import { Server, Terminal, type LucideIcon } from 'lucide-solid'
import {
  siBunnydotnet,
  siCoolify,
  siForgejo,
  type SimpleIcon as SimpleIconData,
} from 'simple-icons'
import { SITE } from '../config/site'

export type InfraIcon =
  | { kind: 'mark' }
  | { kind: 'github' }
  | { kind: 'si'; icon: SimpleIconData }
  | { kind: 'img'; src: string }
  | { kind: 'lucide'; icon: LucideIcon }

// A system is a physical or virtual box, drawn as a sun. Services that run
// on it are drawn as nodes orbiting at radius `orbit`.
export interface InfraSystem {
  id: string
  name: string
  provider: string
  role: string
  desc: string
  icon: InfraIcon
  x: number
  y: number
  orbit: number
}

// Nodes with `system` + `angle` are placed on that system's orbit. Nodes
// with plain x/y are standalone points on the rim.
export interface InfraNode {
  id: string
  name: string
  role: string
  desc: string
  href?: string
  icon: InfraIcon
  system?: string
  angle?: number
  x?: number
  y?: number
}

export interface InfraLink {
  a: string
  b: string
  overlay?: boolean
}

// Positions are map coordinates on a 1000x640 viewBox.
export const INFRA_SYSTEMS: readonly InfraSystem[] = [
  {
    id: 'ctl',
    name: 'vps-ctl',
    provider: 'IONOS',
    role: 'control plane',
    desc: 'IONOS VPS running the Coolify controller.',
    icon: { kind: 'lucide', icon: Server },
    x: 170,
    y: 200,
    orbit: 62,
  },
  {
    id: 'mesh',
    name: 'vps-mesh',
    provider: 'IONOS',
    role: 'network plane',
    desc: 'IONOS VPS running the Netbird coordination server.',
    icon: { kind: 'lucide', icon: Server },
    x: 170,
    y: 470,
    orbit: 62,
  },
  {
    id: 'run',
    name: 'vps-run',
    provider: 'IONOS',
    role: 'deploy target',
    desc: 'IONOS VPS where every Coolify deployment lands.',
    icon: { kind: 'lucide', icon: Server },
    x: 450,
    y: 330,
    orbit: 125,
  },
  {
    id: 'hq',
    name: 'hq',
    provider: 'on-prem',
    role: 'own hardware',
    desc: 'A machine we own. The Reticulum services live here.',
    icon: { kind: 'lucide', icon: Server },
    x: 790,
    y: 300,
    orbit: 95,
  },
]

export const INFRA_NODES: readonly InfraNode[] = [
  {
    id: 'coolify',
    name: 'Coolify',
    role: 'deployment',
    desc: 'Self-hosted PaaS. Pushes every deployment to vps-run.',
    href: 'https://coolify.io',
    icon: { kind: 'si', icon: siCoolify },
    system: 'ctl',
    angle: -95,
  },
  {
    id: 'netbird',
    name: 'Netbird',
    role: 'overlay',
    desc: 'WireGuard network tying all four boxes into one private net.',
    href: 'https://netbird.io',
    icon: { kind: 'img', src: '/infra/netbird.webp' },
    system: 'mesh',
    angle: 200,
  },
  {
    id: 'forge',
    name: 'git.quad4.io',
    role: 'forge',
    desc: 'Our Forgejo fork under the Quad4 mark. Deployed by Coolify.',
    icon: { kind: 'si', icon: siForgejo },
    system: 'run',
    angle: 210,
  },
  {
    id: 'bugsink',
    name: 'Bugsink',
    role: 'error tracking',
    desc: 'Self-hosted error reports at bugs.quad4.io. Nothing leaves the network.',
    href: 'https://bugs.quad4.io',
    icon: { kind: 'img', src: '/infra/bugsink.webp' },
    system: 'run',
    angle: 160,
  },
  {
    id: 'kaneo',
    name: 'Kaneo',
    role: 'task board',
    desc: 'Self-hosted project boards at todo.quad4.io.',
    href: 'https://todo.quad4.io',
    icon: { kind: 'img', src: '/infra/kaneo.webp' },
    system: 'run',
    angle: 20,
  },
  {
    id: 'web',
    name: 'quad4.io',
    role: 'this site',
    desc: 'Static build, deployed by Coolify.',
    href: SITE.url,
    icon: { kind: 'mark' },
    system: 'run',
    angle: -35,
  },
  {
    id: 'reticulum',
    name: 'Reticulum',
    role: 'transport',
    desc: 'The mesh networking stack that rnsh and rngit ride on.',
    href: 'https://reticulum.network',
    icon: { kind: 'img', src: '/infra/reticulum.webp' },
    system: 'hq',
    angle: 155,
  },
  {
    id: 'rngit',
    name: 'rngit',
    role: 'git remote',
    desc: 'Canonical git trees, served over Reticulum.',
    icon: { kind: 'mark' },
    system: 'hq',
    angle: 40,
  },
  {
    id: 'rnsh',
    name: 'rnsh',
    role: 'remote shell',
    desc: 'Shell access to the boxes, over Reticulum.',
    icon: { kind: 'lucide', icon: Terminal },
    system: 'hq',
    angle: 275,
  },
  {
    id: 'github',
    name: 'GitHub',
    role: 'ci + mirror',
    desc: 'Public mirror. Issues, CI and releases run here for now.',
    href: SITE.links.github,
    icon: { kind: 'github' },
    x: 890,
    y: 115,
  },
  {
    id: 'bunny',
    name: 'BunnyCDN',
    role: 'edge cache',
    desc: 'Global CDN serving the MeshChatX release artifacts.',
    href: 'https://bunny.net',
    icon: { kind: 'si', icon: siBunnydotnet },
    x: 665,
    y: 550,
  },
  {
    id: 'mcx',
    name: 'meshchatx.com',
    role: 'app site',
    desc: 'Deployed by Coolify. Releases ship flatpak and Arch packages via BunnyCDN.',
    href: SITE.links.meshchatx,
    icon: { kind: 'img', src: '/meshchatx.webp' },
    system: 'run',
    angle: 60,
  },
]

// Solid edges are deploy or serve relationships. Overlay edges are the
// Netbird network tying the boxes together.
export const INFRA_LINKS: readonly InfraLink[] = [
  { a: 'coolify', b: 'run' },
  { a: 'netbird', b: 'ctl', overlay: true },
  { a: 'netbird', b: 'run', overlay: true },
  { a: 'netbird', b: 'hq', overlay: true },
  { a: 'github', b: 'run' },
  { a: 'github', b: 'forge' },
  { a: 'forge', b: 'rngit' },
  { a: 'bunny', b: 'mcx' },
]
