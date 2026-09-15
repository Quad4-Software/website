import { Link, Meta, Title } from '@solidjs/meta'
import { SITE } from '../config/site'

export const pageTitle = (title: string, path: string): string =>
  path === '/' ? `${SITE.name} - ${SITE.tagline}` : `${title} - ${SITE.name}`

interface Props {
  title: string
  description: string
  path: string
}

export default function PageMeta(props: Props) {
  const title = () => pageTitle(props.title, props.path)
  const url = () => `${SITE.url}${props.path}`
  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={url()} />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:type" content="website" />
    </>
  )
}
