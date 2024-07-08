/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const stylistic = require('@stylistic/eslint-plugin');
const codeStyle = stylistic.configs.customize({
  'indent': 2,
  'quotes': 'single',
  'semi': true,
  'comma-dangle': ['error', 'always-multiline'],
});

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
    'plugin:@stylistic/recommended-extends',
    'plugin:vue/vue3-recommended',
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@stylistic',
  ],
  rules: {
    ...codeStyle.rules,
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/v-on-event-hyphenation': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.vue', '.json'],
      },
    },
  },
};
