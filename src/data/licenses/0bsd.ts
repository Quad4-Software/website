import type { License } from './types'

export const zeroBsd: License = {
  id: '0bsd',
  name: 'BSD Zero Clause License',
  abbreviation: '0BSD',
  notice: 'Copyright (c) 2026 Quad4-Software',
  summary: 'Free to use, copy, modify and distribute for any purpose, with no conditions at all.',
  traits: ['Open source', 'Permissive'],
  permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
  conditions: [],
  limitations: ['Liability', 'Warranty'],
  text: `Copyright (c) 2026 Quad4-Software

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`,
}
