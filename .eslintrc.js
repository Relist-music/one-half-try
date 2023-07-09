const aliases = [
  'components',
  'constants',
  'design_system',
  'helpers',
  'hooks',
  'models',
  'nomenclatures',
  'services',
  'style',
  'svgs',
  'types',
  'utils',
];

const pathGroups = aliases.map((name) => ({
  group: 'internal',
  pattern: `@/${name}/**`,
  position: 'before',
}));

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    // a lot of rules here
    // "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'sort-keys-fix/sort-keys-fix': 'error',
      },
    },
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^$',
          },
        ],
        'max-len': [
          'warn',
          {
            code: 240,
          },
        ],
      },
    },
    {
      files: ['src/styled-system/**/*.mjs'],
      rules: {
        'import/extensions': ['error', 'ignorePackages', { mjs: 'always' }],
        'import/no-unresolved': ['warn', { ignore: ['\\.mjs$'] }],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
    'sort-keys-fix',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/no-named-as-default': 0,

    'import/no-unresolved': 'warn',

    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: '@(react|react-dom)',
            position: 'before',
          },
          ...pathGroups,
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],

    indent: ['error', 2],

    // max-len
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],

    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'export',
        prev: 'multiline-block-like',
      },
    ],

    //https://stackoverflow.com/questions/76624993/prettier-3-0-0-typeerror-prettier-resolveconfig-sync-is-not-a-function
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
      },
    ],

    // https://dev.to/chandelieraxel/why-do-react-need-to-be-in-scope-for-jsx-3hen
    'react/jsx-uses-react': 'off',

    'react/react-in-jsx-scope': 'off',
    // semicolons
    semi: [2, 'always'],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    // https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.js', '.jsx', '.json'],
        map: [['@', './src']],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
    react: {
      version: 'detect',
    },
    typescript: {},
  },
};
