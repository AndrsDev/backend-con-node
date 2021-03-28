module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    'ecmaVersion': 2018
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    'es6': true,
    'node': true,
    'mocha': true
  },
  rules: {
    'no-console': 'warn'
  }
}