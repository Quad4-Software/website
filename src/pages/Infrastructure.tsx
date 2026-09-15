import { For } from 'solid-js'
import InfraMap from '../components/InfraMap'
import PageHeader from '../components/PageHeader'
import PageMeta from '../lib/seo'
import { INFRA_NODES, INFRA_SYSTEMS } from '../data/infra'
import { section } from '../lib/styles'
import { css, cx } from '../../styled-system/css'

const srOnly = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
})

export default function Infrastructure() {
  return (
    <>
      <PageMeta
        title="Infrastructure"
        description="The Quad4 stack: Coolify, Netbird, Kaneo, Bugsink, IONOS and our own hardware, with BunnyCDN at the edge and GitHub for CI."
        path="/infrastructure"
      />

      <PageHeader
        title="Infrastructure"
        badge="WIP"
        blurb="Four boxes: three IONOS VPS running Coolify, Netbird and every deployment, plus our own hardware on-prem running the Reticulum services. BunnyCDN serves the release artifacts, GitHub runs CI for now."
      />

      <section class={cx(section, css({ pt: '0' }))}>
        <InfraMap />
        <ul class={srOnly}>
          <For each={INFRA_SYSTEMS}>
            {(s) => (
              <li>
                {s.name}: {s.provider} {s.role}. {s.desc}
              </li>
            )}
          </For>
          <For each={INFRA_NODES}>
            {(n) => (
              <li>
                {n.href ? <a href={n.href}>{n.name}</a> : n.name}: {n.role}. {n.desc}
              </li>
            )}
          </For>
        </ul>
      </section>
    </>
  )
}
