# quad4.io

Source for [quad4.io](https://quad4.io). Astro and Tailwind CSS.

```sh
pnpm install
pnpm dev
pnpm build
pnpm test        # vitest
pnpm lhci        # lighthouse against dist
pnpm build:edge  # FastEdge wasm component
```

## Layout

- `src/config/` - site constants and nav
- `src/data/` - project catalog and license texts, one file per entry
- `src/pages/`, `src/layouts/`, `src/components/` - Astro pages
- `src/scripts/` - one module per browser feature
- `edge/` - Rust crate, compiles dist/ into a WASI-HTTP component
- `public/` - static assets, `_headers`, sitemap, robots
- `tests/` - vitest suites, including the copy lint and security oracles

Image: `ghcr.io/quad4-software/website`
