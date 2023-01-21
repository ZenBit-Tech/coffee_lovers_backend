## Description

Backend with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## deploy instruction (update backend)
connect to server:
1. Open an SSH client.
2. Locate your private key file. The key used to launch this instance is exampleFileName.pem
3. Run this command, if necessary, to ensure your key is not publicly viewable.
  $ chmod 400 ec2coffeelovers.pem
4. Connect to your instance using its Public IP:
Example:

$ ssh -i "ec2coffeelovers.pem" ec2-user@3.32.2.89 

to update server data:
from main default branch
$ git pull
$ sudo systemctl stop CoffeeLovers.service
$ npm run build
$ sudo systemctl start CoffeeLovers.service

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
