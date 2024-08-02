# Project specified requirements/conventions

Both new and current team members working on this project should apply the following suggestions as much as possible

> Code style consistency is no trivial to maintain and improve code base quality

## I. Awareness of project-wide changes

> All members must be made aware of any changes made or newly added

- Packages
  1. Prefer `yarn`
  2. To see if it is necessary, may there be better approach/work around for such issue

## II. Files/Directories

- Structure of NestJS folder (! = mandatory , ? = optional, ?! = mandatory if have many file)

  ```ts
    src // Service Folder
    |
    |__main.ts // Main file
    |
    |__moduleA // Module Service A
    |
    |__moduleB // Module Service B
    |
    libs
    |
    |__common // Folder for common usage
    |  |
    |  |__constants
    |  |  |
    |  |  |__!database.constant.ts // Database config constants
    |  |
    |  |__enums
    |  |  |
    |  |  |__!database-config.enum.ts // Database config enums
    |  |
    |  |__interfaces
    |  |
    |  |__types
    |  |
    |  |__index.ts // Export everything in folder
    |
    |__config // Folder config/env
    |  |
    |  |__envs // Folder env
    |  |
    |  |__configuration.ts // Export config from env
    |  |
    |  |__index.ts // Export everything in folder
    |
    |__core // Folder integrate, service communication
    |  |
    |  |__database
    |     |
    |     |__postgres // SQL database
    |     |  |
    |     |  |__entities // entities folder
    |     |  |
    |     |  |__migrations // migrations folder
    |     |  |
    |     |  |__index.ts // export everything from folder
    |     |  |
    |     |  |__ormconfig.ts // Config file to specific DataSource for migrating database
    |     |
    |     |__redis // Redis database
    |
    |  |__client
    |  |
    |  |__index.ts // Export everything in folder
    |
    |__utils // Folder utilities, common module/middleware usage
    |  |
    |  |__helpers
    |  |
    |  |__middlewares
    |  |
    |  |__modules
    |  |
    |  |__index.ts // Export everything in folder
  ```

- Structure of Java Spring Boot folder

  ```ts
    src // Service Folder
    |
    |__main
    |  |__java
    |     |__com
    |     |  |__service
    |     |     |__config
    |     |     |__controller
    |     |     |__dto
    |     |     |__exception
    |     |     |__filter
    |     |     |__interceptor
    |     |     |__listener
    |     |     |__model
    |     |     |__repository
    |     |     |__service
    |     |     |__utils
    |     |
    |     |__resources
    |        |__db
    |        |   |__ddl // save migration ddl codes
    |        |   |  |__changelog.sql 
    |        |   |__db.changelog-master.yaml
    |        |
    |        |__application.properties // env
    |        |__liquibase.properties // env for liquibase
    |
    |__pom.xml
  ```


- Structure of Golang folder

  ```ts
    action // Bussiness logic
    |
    api  // route
    |
    internal
    |
    |__config // save config evn 
    |
    |__model
    |  |__delivery.go // model
    |
    |
    main.go
  ```

## III. Code style conventions

- Prefer:
  - variable: camelCase
  - class: PascalCase
  - database:
    + column name: snake_case
    + table name: snake_case


## IV. CommitLint Rules

<details>
<summary>
  CommitLint Usage Guidelines
</summary>

- We use CommitLint to adhere to the commit message convention.
- A valid commit message must start with a commit type (e.g., `feat: [task-jira]`, `fix: [task-jira]`) followed by a colon and a space.
- Example: `feat: [AD-165] Add new feature`.
- We use common types like `feat`, `fix`, `docs`, `chore`, etc.
- Please refer to the CommitLint documentation for more details on the rules and how to configure them.

Documentation Link: [CommitLint Documentation](https://commitLint.js.org/#/)

</details>

## V. Pull Requests Rules
### a. Creating Pull Requests Guidelines

- Follow format:

```md
**Task card**

**Description**
[Provide a brief description of the changes introduced by this pull request.]

**Related Issue**
[If your changes are related to a specific issue, mention it here with a link.]

**Type of Change**
Please mark the appropriate option:

- [ ] Bug fix (non-breaking change that solves an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Migrations
- [ ] Other (please describe):

**Checklist**
Please mark the appropriate options:

- [x] I have performed a self-review of my own code.
- [x] I have made corresponding changes to the documentation (if applicable).
- [x] My changes generate no new warnings or errors.
- [x] I have tested my changes and they pass all relevant tests.
- [x] I have checked the formatting and code style of my changes.
- [x] I have added necessary comments to the code for better understanding (if applicable).

**Changes Made**
List down the key changes made in this pull request:

- Change 1
- Change 2

**How to Test**
Provide clear instructions on how to test the changes made in this pull request. Include any necessary setup, configuration, or sample data.

**Screenshots (if applicable)**
If there are any UI changes, attach relevant screenshots or GIFs here to visually demonstrate the changes.

**Additional Notes (if any)**
If there are any additional notes or comments that you would like to add, mention them here.

```

### b. Migrations ( Prerequisites )

- For NestJS:
  - Run latest migration
```bash
$ yarn run migration:run -- -d libs/core/databases/postgre/ormconfig.ts
```

  - Generate new migration
```bash
$ yarn run migration:generate libs/core/databases/postgre/migrations/<name> -d libs/core/databases/postgre/ormconfig.ts
```
  - Run again migration which have just created

- For Java Spring Boot:
  - Latest migration will be run when launch program

  - Generate new migration
```bash
$ mvn compile liquibase:diff
```
  - Launch program

## VI. Setup

### a. Setup environment

- Create file `.env` as `.env.example`

**Note: Jwt expired must set by day value**

### b. Installation

- Ref:

```json
"engines": {
    "node": ">= ~16",
    "yarn": ">= 1",
  },
```

- Command:

```bash
$ yarn install
```

## VII. Prerequisites

### a. Add service

- Prefer: Use nestjs-cli command `nest generate app <app name>`

- Config services in file [nestjs-cli.json](./nest-cli.json)

### b. Add database

- Create folder `<database name>` in folder [Database](./libs/core/./databases/)

- Follow database structure which mention above [Structure](#b-structure)

- Add database config to env [Env folder](./libs/config/envs/)

- Add database config to database enums [Enums folder](./libs/common/enums/database-config.enum.ts)

```ts
export enum DbConfig {
  // Route to get config with ConfigService
  // Ref: https://docs.nestjs.com/techniques/configuration#configuration
  Postgres = 'db.postgres',
}

export enum DbName {
  // Database name
  // Prefer exactly the same as database type
  Postgres = 'postgres',
}
```

- Add database config to database constants [Constants folder](./libs/common/constants/database.constant.ts)

```ts
export const dbConfig: Partial<Record<DbName, DbConfig>> = {
  // Combine database config from env and enums for usage
  [DbName.Postgres]: DbConfig.Postgres,
  [DbName.Mongo]: DbConfig.Mongo,
};
```

## VIII. Deployment Guide

- Build gateway image and service image

```bash
$ docker build . -t <image name> -f ./apps/<service name>/Dockerfile
```

- Create env file as sample.env in service structure

- Modify path to env on each service which defined in docker-compose file

```yml
version: '3.8'
services:
  <service name>:
      container_name: <service name>
      restart: always
      image: <image-service>
      ...
      env_file: <path to service's env>
...
```

- Run compose

```bash
$ docker-compose -f <path to docker-compose file> up -d
```

- Stop compose

```bash
$ docker-compose -f <path to docker-compose file> down
```


## IX. Configurations

- Todo

## X. Testing

- Todo
