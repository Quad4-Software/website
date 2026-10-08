// Prefix a root-relative path with the site base so the site still works
// when deployed under a subpath, like GitHub Pages pull request previews.
// External and already-relative URLs pass through unchanged.
const base = import.meta.env.BASE_URL
const root = base.endsWith('/') ? base : `${base}/`

export const link = (path: string) => (path.startsWith('/') ? `${root}${path.slice(1)}` : path)
