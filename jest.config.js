module.exports = {
  setupFilesAfterEnv: ['./jest/setup.js'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['<rootDir>/src/popup.tsx'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/jest/**',
    '!**/dist/**',
    '!**/content-scripts/**',
    '!**/static/**',
  ],
};
