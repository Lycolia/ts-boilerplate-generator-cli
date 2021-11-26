# TypeScript project Generator CLI

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Node.js v14 later](https://img.shields.io/badge/node.js-v14_later-green)](LICENSE) [![npm v6 later](https://img.shields.io/badge/npm-v6_later-green)](LICENSE)

This is generator for TypeScript project boilerplate

- Support following project
  - Anything CLI app
    - ✅ Support [SWC](https://swc.rs/)
  - Next.js v12 app for SSG
    - ✅ Support [SWC](https://swc.rs/)
  - React v17 app
    - ⚠️ [SWC](https://swc.rs/) not support
  - Vite vanilla-ts app
    - ⚠️ [SWC](https://swc.rs/) only support in Jest
    - ⚠️ buiding and develop is [Vite](https://vitejs.dev/)
  - Anything server app
    - ✅ Support [SWC](https://swc.rs/)
- And [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [Jest](https://jestjs.io/) are included!!
- Support Yeoman style generator

## Install

- `npm i -g @lycolia/ts-boilerplate-generator-cli`

## Required

- Git
  - and configured git user
- Node.js 14+
- npm 6+

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
  - `-t`, `--type` <type> project type (choices: `ts-cli`, `ts-next`, `ts-react`, `ts-vite-vanilla` , `ts-server`, default: `ts-cli`)
    - `ts-cli`
      - create from [blank boilerplate for CLI app](https://github.com/Lycolia/ts-cli-boilerplate)
    - `ts-next`
      - create from [React v17 included SSG boilerplate for Next.js v11](https://github.com/Lycolia/ts-next-boilerplate)
    - `ts-react`
      - create from [react-router included boilerplate for React v17](https://github.com/Lycolia/ts-react-boilerplate)
    - `ts-vite-vanilla`
      - create from [boilerplate for Vite vannila-ts](https://github.com/Lycolia/ts-react-boilerplate)
    - `ts-server`
      - create from [blank boilerplate for server app](https://github.com/Lycolia/ts-server-boilerplate)
  - `-V`, `--version` output the version number
  - `-h`, `--help` display help for command
- Example
  - `tsg -a your-own-name -d YourProjectDescription -l AGPL-3.0-or-later -p @your-own-name/your-project-name -t ts-react`
