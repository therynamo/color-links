module.exports = {
  setupFilesAfterEnv: ['./jest/setup.js'],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/jest/**',
    '!**/dist/**',
    '!**/content-scripts/**',
    '!**/static/**',
  ],
};
