# TypeScript project Generator CLI

This is generator for TypeScript project boilerplate

- Support following project
  - Anything server app
  - React v17 app
  - Anything CLI app
- And ESLint, Prettier and Jest are included!!
- Support Yeoman style generator

## Install

- `npm i -g @lycolia/ts-boilerplate-generator-cli`

## Required

- Git
  - and configured git user
- Node.js 12+

## Usage

Can setup for README.md and package.json and workspace directory by configure CLI options
When no option then launch yeoman style generator

- Basics
  - `tsg` or `tsg [options]`
- CLI Options
  - `-a`, `--author` <author> project author (default: `unknown`)
  - `-d`, `--description` <description> project description (default: `no description`)
  - `-l`, `--license` <license> project license (default: `MIT`)
  - `-p`, `--project-name` <projectName> project name (default: `@unknown/no-name-project`)
  - `-t`, `--type` <type> project type (choices: `ts-server`, `ts-react`, `ts-cli`, default: `ts-server`)
    - `ts-server`
      - blank boilerplate for server app
    - `ts-react`
      - react-router included boilerplate for React v17
    - `ts-cli`
      - blank boilerplate for CLI app
  - `-V`, `--version` output the version number
  - `-h`, `--help` display help for command
