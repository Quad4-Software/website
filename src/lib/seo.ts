import { SITE } from '../config/site'

export const pageTitle = (title: string, path: string): string =>
  path === '/' ? `${SITE.name} - ${SITE.tagline}` : `${title} - ${SITE.name}`
