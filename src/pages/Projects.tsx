import { createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js'
import { Search } from 'lucide-solid'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import ProjectCard from '../components/ProjectCard'
import { categories, repoCount, type Category, type Project } from '../data/projects'
import { badge, sectionBlurb, sectionTitle } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const controls = css({
  mt: '6',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
})

const searchWrap = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2.5',
  flex: '1',
  minW: '14rem',
  maxW: '22rem',
  px: '3.5',
  py: '2',
  rounded: 'full',
  border: '1px solid',
  borderColor: 'line',
  bg: 'surfaceAlpha',
  color: 'faint',
  _focusWithin: { borderColor: 'faint' },
})

const searchInput = css({
  flex: '1',
  bg: 'transparent',
  border: 'none',
  outline: 'none',
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'fg',
  _placeholder: { color: 'faint' },
})

const matchCount = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
})

const kbd = css({
  fontFamily: 'mono',
  fontSize: '2xs',
  color: 'faint',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'md',
  px: '1.5',
  py: '0.5',
  flexShrink: 0,
})

const jumpRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const jump = css({
  cursor: 'pointer',
  bg: 'transparent',
  color: 'muted',
  _hover: { color: 'fg', borderColor: 'faint' },
})

const catSection = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: { base: '6', md: '8' },
})

const catHead = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  mb: '2',
})

const countBadge = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'faint',
  border: '1px solid',
  borderColor: 'line',
  rounded: 'full',
  px: '2.5',
  py: '0.5',
})

const grid = css({
  mt: '5',
  display: 'grid',
  gap: '4',
  gridTemplateColumns: { base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
})

const empty = css({
  maxW: '72rem',
  mx: 'auto',
  px: { base: '5', md: '8' },
  py: '12',
  textAlign: 'center',
  color: 'muted',
  fontSize: 'sm',
})

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const matches = (p: Project, q: string) =>
  [p.name, p.desc ?? '', p.lang, ...(p.topics ?? [])].join(' ').toLowerCase().includes(q)

export default function Projects() {
  const [query, setQuery] = createSignal('')
  let searchRef!: HTMLInputElement
  const q = () => query().trim().toLowerCase()

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (
        e.key !== '/' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.isContentEditable
      )
        return
      e.preventDefault()
      searchRef.focus()
    }
    window.addEventListener('keydown', onKey)
    onCleanup(() => window.removeEventListener('keydown', onKey))
  })

  const visible = createMemo(() =>
    categories
      .map((c: Category) => ({ ...c, projects: c.projects.filter((p) => matches(p, q())) }))
      .filter((c) => c.projects.length > 0),
  )
  const total = () => visible().reduce((n, c) => n + c.projects.length, 0)

  return (
    <>
      <PageMeta
        title="Projects"
        description={`All ${repoCount} public Quad4 repositories: Reticulum mesh networking, offline-first web apps, self-hosted infrastructure, toolchains and libraries.`}
        path="/projects"
      />

      <PageHeader
        title="Projects"
        blurb="The full public index, grouped by orbit. Canonical development happens over rngit. GitHub mirrors carry issues, CI and releases."
      >
        <div class={controls}>
          <label class={searchWrap}>
            <Search size={15} aria-hidden="true" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Search projects"
              aria-label="Search projects"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              class={searchInput}
            />
            <kbd class={kbd} aria-hidden="true">
              /
            </kbd>
          </label>
          <span class={matchCount} aria-live="polite">
            {total()} / {repoCount}
          </span>
          <div class={jumpRow}>
            <For each={visible()}>
              {(c) => (
                <button
                  type="button"
                  class={cx(badge({ tone: 'outline' }), jump)}
                  onClick={() => scrollTo(c.id)}
                >
                  {c.title}
                </button>
              )}
            </For>
          </div>
        </div>
      </PageHeader>

      <For each={visible()}>
        {(c) => (
          <section id={c.id} class={catSection} style={{ 'scroll-margin-top': '5rem' }}>
            <div class={catHead}>
              <h2 class={cx(sectionTitle, css({ mb: '0' }))}>{c.title}</h2>
              <span class={countBadge}>{c.projects.length}</span>
            </div>
            <p class={sectionBlurb}>{c.blurb}</p>
            <div class={grid}>
              <For each={c.projects}>{(p) => <ProjectCard project={p} />}</For>
            </div>
          </section>
        )}
      </For>

      <Show when={total() === 0}>
        <p class={empty}>No projects match "{query()}".</p>
      </Show>
    </>
  )
}
