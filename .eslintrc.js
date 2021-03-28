module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
  },
};
