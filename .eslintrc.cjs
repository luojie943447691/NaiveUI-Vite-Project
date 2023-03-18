module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'import', 'react'],
  rules: {
    // eslint
    'prefer-const': 'off',
    eqeqeq: ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'export',
          'multiline-expression',
          'multiline-const',
          'multiline-let',
          'multiline-var',
          'return',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
          'export',
          'multiline-expression',
          'multiline-const',
          'multiline-let',
          'multiline-var',
          'directive',
        ],
        next: '*',
      },
    ],
    // @typescript-eslint
    '@typescript-eslint/no-explicit-any': 'off',
    // prettier
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto', //不让prettier检测文件每行结束的格式
      },
    ],

    // import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
          'object',
          'type',
          'sibling',
        ],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vue-*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'never',
      },
    ],

    // jsx
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-string-refs': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-boolean-value': 'error',
    'react/no-unescaped-entities': 'error',
    'react/self-closing-comp': 'error',
  },
}
