---
name: site-maintenance
description: Add or update projects, pages, links and constants on the quad4.io site. Use when editing project data, adding routes, or changing site-wide values.
---

# Site maintenance

Single source of truth:

- `src/config/site.ts` - name, domain, tagline, description, external links,
  contact info, rngit node hash and templates
- `src/config/nav.ts` - `NAV_LINKS`, `ROUTES`, `FOOTER_SECTIONS`
- `src/data/projects.ts` - categories, projects, `featuredNames`

## Add a project

Append to the right category in `src/data/projects.ts`:

```ts
{ name: 'repo-name', desc: 'One plain sentence.', lang: 'Go', stars: 3, topics: ['x'] }
```

`desc` is optional but prefer writing one over falling back to the
placeholder. Keep `desc` plain-language, no jargon, one or two sentences.

To feature it on the home page, add the name to `featuredNames`.

## Add a page

1. `src/pages/X.tsx` with `PageMeta` (title, description, path) and
   `PageHeader` (title, blurb).
2. Import eagerly in `src/main.tsx` and add `<Route path="/x" component={X} />`.
3. Add `{ href: '/x', label: 'X' }` to `NAV_LINKS` and '/x' to `ROUTES`.
4. Add `<url>` to `public/sitemap.xml`.
5. Add `http://localhost/x` to the lhci url list in `lighthouserc.json`.

## Change a constant

Edit `src/config/site.ts` only. `theme-init` inline script in `index.html`
reads `SITE.themeKey` by hand, keep the literal in sync (the security test
checks it).

## Verify

`pnpm lint && pnpm typecheck && pnpm test && pnpm build` then
`pnpm lhci` for anything user-facing.
