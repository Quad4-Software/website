// GitHub language colors.
const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  Go: '#00ADD8',
  Odin: '#60AFFE',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  Shell: '#89e051',
  PHP: '#4F5D95',
}

export const langColor = (lang: string) => LANG_COLORS[lang] ?? 'var(--colors-faint)'
