import { cleanup, render } from '@solidjs/testing-library'
import { afterEach, describe, expect, it } from 'vitest'
import CopyButton from '../src/components/CopyButton'
import Mark from '../src/components/Mark'
import PageHeader from '../src/components/PageHeader'
import ProjectCard from '../src/components/ProjectCard'
import ThemeToggle from '../src/components/ThemeToggle'
import { SITE } from '../src/config/site'

afterEach(cleanup)

describe('ProjectCard', () => {
  it('links to the repo on GitHub with safe rel', () => {
    const { container } = render(() => (
      <ProjectCard project={{ name: 'MeshChatX', desc: 'Client', lang: 'Python' }} />
    ))
    const a = container.querySelector('a')!
    expect(a.getAttribute('href')).toBe(`https://github.com/Quad4-Software/MeshChatX`)
    expect(a.getAttribute('rel')).toContain('noopener')
    expect(a.getAttribute('target')).toBe('_blank')
  })

  it('renders the project name and description', () => {
    const { container } = render(() => (
      <ProjectCard project={{ name: 'Reticulum-Go', desc: 'Go stack', lang: 'Go' }} />
    ))
    expect(container.textContent).toContain('Reticulum-Go')
    expect(container.textContent).toContain('Go stack')
  })

  it('falls back when the description is missing', () => {
    const { container } = render(() => (
      <ProjectCard project={{ name: 'packages', lang: 'Other' }} />
    ))
    expect(container.textContent).toContain('Details coming soon')
  })
})

describe('CopyButton', () => {
  it('renders a copy trigger', () => {
    const { container } = render(() => <CopyButton value="git clone x" />)
    const btn = container.querySelector('button')
    expect(btn).not.toBeNull()
    expect(btn!.textContent).toContain('Copy')
  })
})

describe('PageHeader', () => {
  it('renders title and blurb', () => {
    const { container } = render(() => <PageHeader title="Projects" blurb="All repos." />)
    expect(container.querySelector('h1')!.textContent).toBe('Projects')
    expect(container.textContent).toContain('All repos.')
  })
})

describe('ThemeToggle', () => {
  it('has an accessible label and toggles the theme', () => {
    document.documentElement.dataset.theme = 'dark'
    const { container } = render(() => <ThemeToggle />)
    const btn = container.querySelector('button')!
    expect(btn.getAttribute('aria-label')).toContain('light')
    btn.click()
    expect(document.documentElement.dataset.theme).toBe('light')
    btn.click()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

describe('Mark', () => {
  it('is labelled by default and hidden when decorative', () => {
    const a = render(() => <Mark size={24} />)
    expect(a.container.querySelector('svg')!.getAttribute('aria-label')).toBe(SITE.name)
    a.unmount()

    const b = render(() => <Mark size={24} decorative />)
    expect(b.container.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true')
  })
})
