## Description

Backend with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Environment Variables

To run app you must create env files in root directory

```bash
# npm run start && npm run start:prod
.production.env

# npm run start:dev
.development.env
```

- **PORT** - port to run app
- **DB_NAME** - database name
- **DB_HOST** - database host
- **DB_PORT** - database port
- **DB_USERNAME** - database username
- **DB_PASSWORD** - database password
- **GOOGLE_CLIENT_ID** - "71848933982-oc9dn519u5k0dp3pp0a8h20maaokdap8.apps.googleusercontent.com"
- **GOOGLE_CLIENT_SECRET** - "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"

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
