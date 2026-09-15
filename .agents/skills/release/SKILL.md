---
name: release
description: How the quad4.io container image is built, published and signed. Use when cutting a tag, updating the Dockerfile or compose file, or touching the docker workflow.
---

# Release and container signing

## Image

Multi-stage `Dockerfile`: `node:24-alpine` builds `dist/`,
`nginxinc/nginx-unprivileged` (digest-pinned) serves it as uid 101 on port 8080. `docker/nginx.conf` handles SPA fallback, caching tiers, security
headers and denies dotfiles plus `_`-prefixed host metadata.

Run locally:

```sh
podman build -t quad4-website .        # docker works too
podman run --rm -p 127.0.0.1:8080:8080 quad4-website
# or: docker compose up --build
```

Compose hardening: read_only rootfs, cap_drop ALL, no-new-privileges, tmpfs
for nginx runtime dirs, healthcheck, resource limits. Keep them.

## Publishing

`.github/workflows/docker.yml` pushes to `ghcr.io/quad4-software/website`
on `master` (tag `master`, `sha-...`) and on `v*.*.*` tags (semver tags). Builds
carry buildkit SLSA provenance and an SBOM. Signing is cosign keyless via the
workflow OIDC identity (Fulcio + Rekor), no keys stored anywhere.

Cut a release:

```sh
git tag v1.0.0 && git push --tags   # workflow builds, pushes, signs
```

## Verify an image

```sh
cosign verify ghcr.io/quad4-software/website@<digest> \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com \
  --certificate-identity-regexp https://github.com/Quad4-Software/website
```

## When touching the Dockerfile

- Keep both base images pinned by digest (`name:tag@sha256:`). To re-pin,
  query the registry manifest and record the index digest.
- Keep OCI labels in sync with `src/config/site.ts` values.
- The nginx CSP hashes must match the inline scripts in `index.html`.
  `pnpm test` checks `public/_headers`; update `docker/nginx.conf` to match.
- OWASP Docker top 10: non-root user, minimal pinned base, no secrets or
  tools in the final stage, read-only-capable fs, healthcheck, resource
  limits, stdout logging only.
