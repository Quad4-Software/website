// Repo-hosted assets are served from the statically.io mirror of this
// repository, pinned to the deployed commit for immutable caching.
const sha = import.meta.env.GIT_SHA

export const asset = (path: string) =>
  `https://cdn.statically.io/gh/Quad4-Software/website@${sha}/public${path}`
