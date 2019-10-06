# Solena Client

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This project was bootstrapped with [Create Next App](https://github.com/segmentio/create-next-app).

## Table of Contents

- [Environments](#environments)
- [Available Scripts](#available-scripts)
  - [yarn dev](#yarn-dev)
  - [yarn build](#yarn-build)
  - [yarn start](#yarn-start)
  - [yarn format](#yarn-format)
- [URL routes](#url-routes)
  - [/](#/)
  - [/view/:id](#/view/:id)
  - [/room/:id](#/room/:id)

## Environments

- Node 11.10
- Yarn 1.15
- React 16.10
- Next 9.0

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode on [http://localhost:3000](http://localhost:3000).

### `yarn build`

Builds the app for production to the `.next` folder.

### `yarn start`

Starts the application in production mode.
The application should be compiled with \`next build\` first.

### `yarn format`

Formats javascript files code style by running prettier.

## URL routes

Routing in Next.js is based on the file system.
Read more about [Next's Routing](https://github.com/zeit/next.js#routing).

### `/`

👷[WIP]

Top page of client.
Be able to jump to view page, room page with inputting id.

### `/view/:id`

👷[WIP]

Shows notifies that are sent to specified room. 

### `/room/:id`

👷[WIP]

Sends notifies to specified room by pushing buttons.
