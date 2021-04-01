module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'docs', 'feat', 'fix', 'refactor', 'revert', 'test'],
    ],
    'scope-enum': [2, 'always', ['core', 'movies', 'users', 'user-movies']],
  },
};
