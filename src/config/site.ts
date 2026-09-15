const RNGIT_NODE = '06a54b505bb67b25ef3f8097e8001edc'

export const SITE = {
  name: 'Quad4',
  legalName: 'Quad4 Software',
  domain: 'quad4.io',
  url: 'https://quad4.io',
  tagline: 'Software for the far edge.',
  description:
    'Quad4 is an independent software collective building mesh networking tools, offline-first web apps, and self-hosted infrastructure.',
  themeKey: 'quad4-theme',
  org: 'Quad4-Software',
  links: {
    github: 'https://github.com/Quad4-Software',
    forge: 'https://git.quad4.io',
    meshchatx: 'https://meshchatx.com',
    nomadnet: 'https://github.com/markqvist/NomadNet',
    sideband: 'https://github.com/markqvist/Sideband',
  },
  contact: {
    email: 'team@quad4.io',
    lxmf: 'f489752fbef161c64d65e385a4e9fc74',
  },
  rngit: {
    nodeHash: RNGIT_NODE,
    cloneTemplate: `git clone rns://${RNGIT_NODE}/public/<repo>`,
    nomadnet: `${RNGIT_NODE}:/page/index.mu`,
  },
} as const

export const repoUrl = (name: string) => `${SITE.links.github}/${name}`
export const rnsClone = (repo: string) => `git clone rns://${RNGIT_NODE}/public/${repo}`
