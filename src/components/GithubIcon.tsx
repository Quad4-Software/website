import { siGithub } from 'simple-icons'
import SimpleIcon from './SimpleIcon'

interface Props {
  size?: number
  class?: string
  decorative?: boolean
}

export default function GithubIcon(props: Props) {
  return <SimpleIcon icon={siGithub} {...props} />
}
