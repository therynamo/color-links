module.exports = {
  setupFilesAfterEnv: ['./jest/setup.js', 'jest-webextension-mock'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['<rootDir>/src/popup.tsx'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/content-scripts/contentscript.ts',
    '!**/node_modules/**',
    '!**/jest/**',
    '!**/dist/**',
    '!**/static/**',
  ],
};
