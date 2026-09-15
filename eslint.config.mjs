import globals from 'globals'
import solid from 'eslint-plugin-solid'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'styled-system/**', 'node_modules/**', '.lighthouseci/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  solid.configs['flat/typescript'],
)
