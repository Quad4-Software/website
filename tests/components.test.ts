import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import CopyButton from '../src/components/CopyButton.astro'
import Mark from '../src/components/Mark.astro'
import PageHeader from '../src/components/PageHeader.astro'
import ProjectCard from '../src/components/ProjectCard.astro'
import ThemeToggle from '../src/components/ThemeToggle.astro'
import { SITE } from '../src/config/site'

const container = await AstroContainer.create()
type Component = Parameters<typeof container.renderToString>[0]
const render = (component: Component, props?: Record<string, unknown>) =>
  container.renderToString(component, { props })

describe('ProjectCard', () => {
  it('links to the repo on GitHub with safe rel', async () => {
    const html = await render(ProjectCard, {
      project: { name: 'MeshChatX', desc: 'Client', lang: 'Python' },
    })
    expect(html).toContain('href="https://github.com/Quad4-Software/MeshChatX"')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain('target="_blank"')
  })

  it('renders the project name and description', async () => {
    const html = await render(ProjectCard, {
      project: { name: 'Reticulum-Go', desc: 'Go stack', lang: 'Go' },
    })
    expect(html).toContain('Reticulum-Go')
    expect(html).toContain('Go stack')
  })

  it('shows fork and mirror badges when flagged', async () => {
    const html = await render(ProjectCard, {
      project: { name: 'zot', desc: 'x', lang: 'Go', fork: true },
    })
    expect(html).toContain('title="Fork"')
  })

  it('falls back when the description is missing', async () => {
    const html = await render(ProjectCard, {
      project: { name: 'packages', lang: 'Other' },
    })
    expect(html).toContain('Details coming soon')
  })

  it('renders the license as a delegated link, not a nested anchor', async () => {
    const html = await render(ProjectCard, {
      project: { name: 'argus', desc: 'x', lang: 'Rust', license: 'MIT-0' },
    })
    expect(html).toContain('data-goto="/licenses#')
    expect(html).not.toContain('<a href="/licenses')
  })
})

describe('CopyButton', () => {
  it('renders a copy trigger carrying the value', async () => {
    const html = await render(CopyButton, { value: 'git clone x' })
    expect(html).toContain('data-copy="git clone x"')
    expect(html).toContain('Copy')
  })
})

describe('PageHeader', () => {
  it('renders title and blurb', async () => {
    const html = await render(PageHeader, { title: 'Projects', blurb: 'All repos.' })
    expect(html).toContain('<h1')
    expect(html).toContain('Projects')
    expect(html).toContain('All repos.')
  })
})

describe('ThemeToggle', () => {
  it('has an accessible label and the toggle hook', async () => {
    const html = await render(ThemeToggle)
    expect(html).toContain('data-theme-toggle')
    expect(html).toMatch(/aria-label="[^"]+"/)
  })
})

describe('Mark', () => {
  it('is labelled by default and hidden when decorative', async () => {
    const html = await render(Mark, { size: 24 })
    expect(html).toContain(`aria-label="${SITE.name}"`)

    const hidden = await render(Mark, { size: 24, decorative: true })
    expect(hidden).toContain('aria-hidden="true"')
  })
})
