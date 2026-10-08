import { mesh } from './mesh'
import { offline_web } from './offline-web'
import { infrastructure } from './infrastructure'
import { security } from './security'
import { toolchains } from './toolchains'
import type { Category, Project } from './types'

export type { Category, Project }

export const categories: Category[] = [mesh, offline_web, infrastructure, security, toolchains]

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
