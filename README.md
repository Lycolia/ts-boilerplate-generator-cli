# TypeScript project Generator CLI

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Node.js v12 later](https://img.shields.io/badge/node.js-v12_later-green)](LICENSE)

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
- CLI Options (All optional)
  - `-a`, `--author` <author> project author (default: `unknown`)
  - `-d`, `--description` <description> project description (default: `no description`)
  - `-l`, `--license` <license> project license (default: `MIT`)
  - `-p`, `--project-name` <projectName> project name (default: `@unknown/no-name-project`)
  - `-t`, `--type` <type> project type (choices: `ts-server`, `ts-react`, `ts-cli`, default: `ts-server`)
    - `ts-server`
      - create from [blank boilerplate for server app](https://github.com/Lycolia/ts-server-boilerplate)
    - `ts-react`
      - create from [react-router included boilerplate for React v17](https://github.com/Lycolia/ts-react-boilerplate)
    - `ts-cli`
      - create from [blank boilerplate for CLI app](https://github.com/Lycolia/ts-cli-boilerplate)
  - `-V`, `--version` output the version number
  - `-h`, `--help` display help for command
- Example
  - `tsg -a your-own-name -d YourProjectDescription -l AGPL-3.0-or-later -p @your-own-name/your-project-name -t ts-react`
