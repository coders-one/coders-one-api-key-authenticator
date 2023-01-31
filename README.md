# Coders App - Api Key Authenticator

## Installation

```sh
npm install coders-app-api-key-authenticator
```

## Usage

```ts
import { authenticateApp } from "coders-app-api-key-authenticator";

const isAuthenticated = await authenticateApp(
  targetApp,
  appToAuthenticate,
  hashToAuthenticate
);
```

## API

```ts
authenticateApp(targetApp, appToAuthenticate, hashToAuthenticate);
```

Authenticates the appToAuthenticate against the targetApp using the hashToAuthenticate.

Returns a promise that resolves to a boolean indicating whether the application is authenticated or not.
| Parameter | Type | Description |
| --- | --- | --- |
| targetApp | `string` | The target application to authenticate against. (current app) |
| appToAuthenticate | `string` | The application to be authenticated. |
| hashToAuthenticate | `string` | The hash used to authenticate the application. |

## Env

This package requires the following environment variables in your `.env`

| Name             | Example               | Description        |
| ---------------- | --------------------- | ------------------ |
| `REDIS_HOST`     | `redis.redislabs.com` | Redis host address |
| `REDIS_PORT`     | `15000`               | Redis port         |
| `REDIS_PASSWORD` | `Gsdhj83Sdj9fhf3D`    | Redis password     |

## Development

This project uses TypeScript, you can run the compiler in watch mode with:

```
npm run build:dev
```

You can run the compiled app with nodemon with:

```
npm run start:dev
```

You can run tests in watch mode with:

```
npm run test:dev
```

These git hooks are configured in the project with Husky:

- `pre-commit`: fails if it finds `console.*` or `debugger` statements, also runs ESLint and fails if errors are present.
- `commit-msg`: fails if the message is shorter than 11 or longer than 71 characters.
- `pre-push`: fails if the name of the branch doesn't start with _feature/_, _bugfix/_ or /_hotfix/_.

## Build

If you want to build the package, you can run the bundler (tsup) with:

```
npm run build
```

You can run a full build with:

```
npm run build:full
```

You can run tests with:

```
npm test
```

You can run tests and generate coverage report with:

```
npm run test:coverage
```