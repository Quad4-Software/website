import { qsl100bsd } from './qsl-1.0-0bsd'
import { zeroBsd } from './0bsd'
import { apache2 } from './apache-2.0'
import { bsd2Clause } from './bsd-2-clause'
import { bsd3Clause } from './bsd-3-clause'
import { gpl30 } from './gpl-3.0'
import { mit } from './mit'
import { mit0 } from './mit-0'
import { mpl2 } from './mpl-2.0'
import { reticulum } from './reticulum'
import type { License } from './types'
import { link } from '../../lib/url'

export type { License }

export const LICENSES: readonly License[] = [
  qsl100bsd,
  zeroBsd,
  apache2,
  bsd2Clause,
  bsd3Clause,
  gpl30,
  mit,
  mit0,
  mpl2,
  reticulum,
]

const licenseByAbbr = (abbr: string): License | undefined =>
  LICENSES.find((l) => l.abbreviation === abbr || l.abbreviation === `${abbr}-1.0-0BSD`)

export const licenseHref = (abbr: string): string =>
  licenseByAbbr(abbr) ? link(`/licenses#${licenseByAbbr(abbr)!.id}`) : link('/licenses')

export const licenseName = (abbr: string): string | undefined => licenseByAbbr(abbr)?.name
