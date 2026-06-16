import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'blob-report/**',
    ],
  },

  // Basic JavaScript linting for configuration files.
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...eslint.configs.recommended,
  },

  // Type-aware linting only for TypeScript files.
  {
    files: ['**/*.ts', '**/*.tsx'],

    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettier,
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);