module.exports = {
  resetMocks: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['types/'],
  testPathIgnorePatterns: ['(node_modules|dist)'],
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: {
          type: 'commonjs'
        },
        jsc: {
          target: 'es2020',
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: false,
            dynamicImport: false
          },
          baseUrl: '.',
          paths: {
            'src/*': ['src/*'],
            'package.json': ['package.json']
          }
        }
      }
    ]
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
