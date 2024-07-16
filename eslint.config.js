const eslint = require('@eslint/js');
const eslintTypeScript = require('typescript-eslint');
const eslintJest = require('eslint-plugin-jest');
const eslintLycolia = require('@lycolia/eslint-config');

module.exports = eslintTypeScript.config(
  eslint.configs.recommended,
  ...eslintTypeScript.configs.recommended,
  eslintJest.configs['flat/style'],
  eslintJest.configs['flat/recommended'],
  eslintLycolia,
  {
    ignores: [
      'dist/*',
      'coverage/*',
      '**/*.d.ts',
      '/src/public/',
      '/src/type',
      '*.config.js'
    ],
    languageOptions: {
      parser: eslintTypeScript.parser,
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  }
);
