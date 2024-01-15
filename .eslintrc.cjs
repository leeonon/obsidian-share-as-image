/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    semi: 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'a11y-click-events-have-key-events': 'off',
    'svelte/valid-compile': ['error', { ignoreWarnings: false }],
  },
};
