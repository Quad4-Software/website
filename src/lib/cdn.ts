// Repo-hosted assets live in public/ and are served same-origin. The
// site base prefix keeps them resolving on subpath deployments.
import { link } from './url'

export const asset = (path: string) => link(path)
