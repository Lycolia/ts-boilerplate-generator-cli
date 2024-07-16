# TypeScript project Generator CLI

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Node.js v22 later](https://img.shields.io/badge/node.js-v22_later-green)](LICENSE) [![npm v10 later](https://img.shields.io/badge/npm-v10_later-green)](LICENSE)

This is generator for TypeScript project boilerplate

## Support projects

| Target      | [SWC](https://swc.rs/) | [Jest](https://jestjs.io/) | [ESLint](https://eslint.org/) | [Prettier](https://prettier.io/) | [Storybook](https://storybook.js.org/) |
| ----------- | ---------------------- | -------------------------- | ----------------------------- | -------------------------------- | -------------------------------------- |
| Node CLI    | ✅                     | ✅                         | ✅                            | ✅                               | ❌                                     |
| Next.js v14 | ✅                     | ✅                         | ✅                            | ✅                               | ✅                                     |

## Install

- `npm i -g @lycolia/ts-boilerplate-generator-cli`

## Required

- Git
  - and configured git user
- Node.js 20+
- npm 10+

## Usage

Can setup for README.md and package.json and workspace directory by configure CLI options
When no option then launch yeoman style generator

- Basics
  - `tsg` or `tsg [options]`
- CLI Options (All optional)
  - `-a`, `--author` <author> project author (default: `unknown`)
  - `-d`, `--description` <description> project description (default: `no description`)
  - `-l`, `--license` <license> project license (default: `MIT`)
  - `-p`, `--project-name` <projectName> project name (default: `@unknown/no-name-project`)
  - `-t`, `--type` <type> project type (choices: `ts-cli`, `ts-next` default: `ts-cli`)
    - `ts-cli`
      - create from [blank boilerplate for CLI app](https://github.com/Lycolia/ts-cli-boilerplate)
    - `ts-next`
      - create from [React v18 included SSG boilerplate for Next.js v13](https://github.com/Lycolia/ts-next-boilerplate)
  - `-V`, `--version` output the version number
  - `-h`, `--help` display help for command
- Example
  - `tsg -a your-own-name -d YourProjectDescription -l AGPL-3.0-or-later -p @your-own-name/your-project-name -t ts-cli`
