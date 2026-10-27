# quad4.io

Source for [quad4.io](https://quad4.io). Plain HTML and CSS, no JavaScript
and no build step. The repo root is the site root.

## Layout

- `index.html`, `404.html` - top level pages
- `projects/`, `git/`, `contact/`, `licenses/`, `branding/` - one `index.html` per section
- `style.css` - the whole stylesheet
- `fonts/` - vendored woff2, Space Grotesk and Space Mono
- `brand/`, `*.svg`, `*.png`, `*.webp` - mark, lockups and social assets
- `_headers`, `robots.txt`, `sitemap.xml`, `CNAME` - host metadata

Serve locally with any static server, for example:

```sh
python3 -m http.server 8080
```

Image: `ghcr.io/quad4-software/website`
