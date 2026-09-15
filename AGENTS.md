# AGENTS.md

Static website for quad4.io. SolidJS + Panda CSS + Ark UI, built with Vite 8
and pnpm 11. No backend, no analytics, no remote assets.

## Commands

```sh
pnpm dev          # panda codegen + vite dev server
pnpm build        # production build to dist/
pnpm preview      # serve dist/ locally
pnpm lint         # eslint
pnpm typecheck    # tsc (TypeScript 6)
pnpm typecheck:native  # tsgo (TypeScript 7 sidecar, no emit)
pnpm test         # vitest: components, copy lint, security, project data
pnpm format       # prettier write
pnpm lhci         # lighthouse autorun against dist/ (needs CHROME_PATH on some systems)
docker build -t quad4-website .   # or podman build
```

## Layout

- `src/config/site.ts` - every site constant (name, urls, contact, rngit node)
- `src/config/nav.ts` - nav links, footer sections, route list
- `src/data/projects.ts` - project catalog, categories, featured list
- `src/lib/styles.ts` - shared recipes (section, card, button, badge, codeBlock)
- `src/lib/seo.tsx` - PageMeta (title, description, canonical, og)
- `src/lib/theme.ts` - theme signal + toggle
- `src/components/` - Nav, Footer, Mark, BlackHole, Starfield, ProjectCard,
  PageHeader, Snippet, CopyButton, ThemeToggle, GithubIcon
- `src/pages/` - Home, Projects, Git, Contact, NotFound
- `public/` - static assets, `_headers`, `_redirects`, sitemap, robots
- `tests/` - vitest suites including the copy lint and security oracles

## Rules

- Centralize. New facts go in `src/config/site.ts`, links in
  `src/config/nav.ts`, project entries in `src/data/projects.ts`. No
  hardcoded strings in components or pages.
- Lists render with `<For>`, never `.map()` (eslint-plugin-solid enforces it).
- Icons come from lucide-solid or simple-icons. The only inline SVG is the
  Quad4 brand mark in `src/components/Mark.tsx` and the BlackHole art.
- No remote assets. Fonts, icons and images are vendored or bundled.
- Copy follows the no-slop rules in `tests/slop.data.ts`. The copy test fails
  on banned words, phrases, punctuation and structural tells. Run
  `pnpm test` after touching prose.
- Plain ASCII in source copy: no em/en dashes, no curly quotes, no emoji, no
  unicode arrows, no semicolons in prose.
- Adding a page: create `src/pages/X.tsx`, add a lazy-free `Route` in
  `src/main.tsx`, add the link to `NAV_LINKS` and `ROUTES` in
  `src/config/nav.ts`, add it to `public/sitemap.xml` and the lhci url list
  in `lighthouserc.json`.
- Changing `index.html` inline scripts (JSON-LD, theme init) changes their
  sha256. Update the CSP hashes in `public/_headers` and
  `docker/nginx.conf`. `pnpm test` fails if they drift.
- `index.html` is prettier-ignored on purpose. Format it by hand.

## Security

- pnpm supply-chain policy lives in `pnpm-workspace.yaml`: seven-day minimum
  release age, no exotic subdeps, strict dep builds, trust no-downgrade,
  frozen lockfile installs. Do not loosen it.
- All GitHub Actions are pinned to full SHAs with version comments. Every job
  starts with step-security/harden-runner. Top-level `permissions: {}`.
- Never add workflow steps that run PR-controlled input as shell code.
- The container runs as uid 101 on nginx-unprivileged with a read-only
  rootfs. Keep it that way.
- Images published to ghcr.io are signed with cosign keyless (Fulcio OIDC)
  plus buildkit provenance and SBOM attestations.

## Verification

Before shipping changes: `pnpm lint && pnpm typecheck && pnpm test && pnpm
build && pnpm lhci`. Lighthouse must stay at 100 across all categories.
