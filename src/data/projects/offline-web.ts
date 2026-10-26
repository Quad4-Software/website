import type { Category } from './types'

export const offline_web: Category = {
  id: 'offline-web',
  title: 'Offline-first web',
  blurb: 'Apps that run translation entirely in your browser. Nothing leaves the device.',
  projects: [
    {
      name: 'translatasm',
      desc: 'Offline text translation in the browser.',
      updated: '2026-09-18T04:17:05Z',
      license: '0BSD',
      stars: 2,
      downloads: 194,
      lang: 'JavaScript',
      topics: ['offline', 'translation', 'browser'],
    },
    {
      name: 'bergamot-translator',
      desc: 'The translation engine behind translatasm.',
      fork: true,
      updated: '2026-10-15T18:27:18Z',
      license: 'MPL-2.0',
      lang: 'C++',
    },
  ],
}
