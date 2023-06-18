# problem-solving-env &middot; ![test workflow](https://github.com/patricklizon/problem-solving-env/actions/workflows/test.yml/badge.svg?event=push)

Simple environment for solving coding challenges.

## Table of content

* [Prerequisites](#prerequisites)
* [Setup](#setup)
* [Scripts](#scripts)

## Prerequisites

* [Node](https://nodejs.org/en/) - version specified in [.nvmrc](/.nvmrc) file.
* [npm](https://www.npmjs.com/) - usually comes with node.

_It's recommended to use node version manger (ie. [fnm](https://github.com/Schniz/fnm)), for easier switching between different projects._

## Setup

```sh
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
| `test:types`    | validates TS types            |
| `test:format`   | validates code formatting     |
| `test:lint`     | validates linting rules       |

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
