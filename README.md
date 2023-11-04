# problem-solving-env &middot; ![test workflow](https://github.com/patricklizon/problem-solving-env/actions/workflows/test.yml/badge.svg?event=push)

Simple environment for solving coding challenges.

## Table of content

* [Prerequisites](#prerequisites)
* [Setup](#setup)
* [Scripts](#scripts)

## Prerequisites

* [Node](https://nodejs.org/en/) - version specified in [.nvmrc](/.nvmrc) file.
* [corepack](https://github.com/nodejs/corepack) - package manager that allows
using correct version of the package manager without installing it.

_It's recommended to use node version manger
(ie. [fnm](https://github.com/Schniz/fnm))_

## Setup

```sh
# use correct node version
fnm use

# Install dependencies
npm ci

# Start tests in watch mode
npm run test
```

## Scripts

Summary of defined npm scripts.

### Test

| Script          | Description                   |
| --------------- | ----------------------------- |
| `test`          | run tests in watch mode       |
| `test:run`      | run tests once                |

### Checks

| Script          | Description                   |
| --------------- | ----------------------------- |
| `check:types`    | validates TS types            |
| `check:format`   | validates code formatting     |
| `check:lint`     | validates linting rules       |

### Fix

| Script       | Description                |
| ------------ | -------------------------- |
| `fix:format` | tries to fix formatting    |
| `fix:lint`   | tries to fix linter issues |
