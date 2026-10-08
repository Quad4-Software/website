export interface License {
  id: string
  name: string
  version?: string
  abbreviation: string
  aka?: string
  notice?: string
  summary: string
  traits: string[]
  permissions: string[]
  conditions: string[]
  limitations: string[]
  text: string
}
