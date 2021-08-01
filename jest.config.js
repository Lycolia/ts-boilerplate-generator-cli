module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: ['**/*.{ts,js}', '!**/node_modules/**', '!**/dist/**'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|dist)[/\\\\]'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  silent: false,
};
