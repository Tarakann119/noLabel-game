module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  ignorePatterns: ['**/dist/**/*.js', 'init.js'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  'overrides': [
    // override "simple-import-sort" config
    {
      'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
      'rules': {
        'simple-import-sort/imports': [
          'error',
          {
            'groups': [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};

