import type { Category } from './types'

export const offline_web: Category = {
  id: 'offline-web',
  title: 'Offline-first web',
  blurb:
    'Apps that run dictation, transcription and translation entirely in your browser. Nothing leaves the device.',
  projects: [
    {
      name: 'dictationasm',
      desc: 'Offline voice dictation that runs entirely in the browser.',
      updated: '2026-09-19T05:32:49Z',
      license: '0BSD',
      lang: 'JavaScript',
      topics: ['offline', 'voice', 'browser'],
    },
    {
      name: 'transcriptasm',
      desc: 'Offline audio transcription in the browser.',
      updated: '2026-09-18T14:08:03Z',
      license: '0BSD',
      lang: 'JavaScript',
      topics: ['offline', 'audio', 'browser'],
    },
    {
      name: 'speakasm',
      desc: 'Offline text-to-speech in the browser.',
      updated: '2026-09-18T12:36:43Z',
      license: '0BSD',
      lang: 'JavaScript',
      topics: ['offline', 'speech', 'browser'],
    },
    {
      name: 'translatasm',
      desc: 'Offline text translation in the browser.',
      updated: '2026-09-18T04:17:05Z',
      license: '0BSD',
      lang: 'JavaScript',
      topics: ['offline', 'translation', 'browser'],
    },
    {
      name: 'bergamot-translator',
      desc: 'The translation engine behind translatasm.',
      fork: true,
      updated: '2026-09-25T22:48:35Z',
      license: 'MPL-2.0',
      lang: 'C++',
    },
  ],
}
