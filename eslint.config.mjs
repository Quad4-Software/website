import globals from 'globals'
import astro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '.lighthouseci/**'],
  },
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{ts,mts,cts,mjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
)
