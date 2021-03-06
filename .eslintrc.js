module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'import', 'react-hooks'],
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
  rules: {
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
