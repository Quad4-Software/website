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
