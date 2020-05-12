module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
  ],
};
