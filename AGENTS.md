# AGENTS.md

Static website for quad4.io. Astro 7 + Tailwind CSS 4, built with Vite and
pnpm 12. No framework islands, no backend, no analytics, no remote assets.

## Commands

```sh
pnpm dev          # astro dev server
pnpm build        # production build to dist/
pnpm preview      # serve dist/ locally on :4321
pnpm lint         # eslint (astro + ts)
pnpm typecheck    # astro check (TypeScript 6)
pnpm typecheck:native  # tsgo (TypeScript 7 sidecar, no emit)
pnpm test         # vitest: astro container render, copy lint, security, data
pnpm format       # prettier write (prettier-plugin-astro)
pnpm lhci         # lighthouse autorun against dist/ (needs CHROME_PATH on some systems)
pnpm build:edge   # build the site, then the FastEdge wasm component (needs wasm32-wasip2)
pnpm test:edge    # cargo test for the edge crate
pnpm serve:edge   # run the component under wasmtime serve on :8080
docker build -t quad4-website .   # or podman build
```

## Layout

- `src/config/site.ts` - every site constant (name, urls, contact, rngit node)
- `src/config/nav.ts` - nav links, footer sections, route list
- `src/data/projects.ts` - project catalog, categories, featured list
- `src/data/licenses.ts` - custom license texts (QSL-1.0-0BSD)
- `src/data/brand.ts`, `src/data/langs.ts` - brand page data, lang colors
- `src/lib/styles.ts` - shared Tailwind class strings (section, card, button, badge, codeBlock)
- `src/lib/seo.ts` - pageTitle
- `src/lib/time.ts` - age helpers, `src/lib/orbit.ts` - glyph geometry
- `src/layouts/Base.astro` - the only HTML shell: meta, JSON-LD, theme init,
  fonts, nav, footer, starfield
- `src/scripts/site.ts` - all client JS (theme, menu, copy, search, gravity)
- `src/styles/global.css` - Tailwind import, void/paper theme tokens
- `src/components/` - .astro components (Nav, Footer, Mark, BlackHole, ...)
- `src/pages/` - .astro pages, file-based routing (index, projects, git, ...)
- `public/` - static assets, `_headers`, sitemap, robots
- `edge/` - Rust crate. Compiles dist/ into a WASI-HTTP component for Gcore
  FastEdge (wasm32-wasip2 + wstd). Output:
  edge/target/wasm32-wasip2/release/quad4_edge.wasm
- `tests/` - vitest suites including the copy lint and security oracles

## Rules

- Centralize. New facts go in `src/config/site.ts`, links in
  `src/config/nav.ts`, project entries in `src/data/projects.ts`. No
  hardcoded strings in components or pages.
- Lists render with `.map()` in template expressions.
- Icons come from `@lucide/astro` or `simple-icons`. The only inline SVG is
  the Quad4 brand mark in `src/components/Mark.astro` and the BlackHole art.
- No remote assets. Fonts, icons and images are vendored or bundled.
- Interactivity is vanilla TS in `src/scripts/site.ts`, wired by `data-*`
  attributes. No client frameworks, no `client:*` directives.
- Copy follows the no-slop rules in `tests/slop.data.ts`. The copy test fails
  on banned words, phrases, punctuation and structural tells. Run
  `pnpm test` after touching prose.
- Plain ASCII in source copy: no em/en dashes, no curly quotes, no emoji, no
  unicode arrows, no semicolons in prose.
- Adding a page: create `src/pages/X.astro`, add the link to `NAV_LINKS` and
  `ROUTES` in `src/config/nav.ts`, add it to `public/sitemap.xml` and the
  lhci url list in `lighthouserc.json`.
- Only `is:inline` scripts in `Base.astro` ship inline (theme init and
  JSON-LD). Changing their text changes their sha256. Update the CSP hashes
  in `public/_headers` and `docker/nginx.conf`. `pnpm test` fails if they
  drift. Processed `<script>` blocks are bundled to `/_astro/` and covered
  by `script-src 'self'`.

## FastEdge

The edge crate embeds dist/ at build time and serves it through a
wasi:http incoming-handler (the FastEdge contract). Routing mirrors
nginx.conf: `/x` resolves to `/x/index.html` without a redirect, misses get
the embedded 404 page, `_`-prefixed files and dotfiles are never embedded.
Security headers are parsed out of `public/_headers` by `edge/build.rs`, so
the `/*` block stays the single source of truth. Cache tiers match nginx:
`/_astro/` immutable, media 30 days, html no-cache.

Deploy by uploading `quad4_edge.wasm` in the FastEdge console or API. Test
locally with `wasmtime serve -S cli` (`pnpm serve:edge`).

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
build && pnpm lhci`. Lighthouse stays at 100 for accessibility,
best-practices and seo. Performance gates at 0.95: the score is continuous
and shared CI runners swing the last point or two.
