# NodeJS Backend

This project consists on an API-Rest built with node, express, and mongodb. Includes a CRUD for movies and users.

## Get started

1. `git clone git@github.com:AndrsDev/backend-con-node.git`
2. `cd backend-con-node`
3. `yarn` or `yarn install`
4. `yarn husky install`
5. `yarn dev` or `yarn start`

## Build docker container

1. `docker build -t movies-api .`
2. `docker run -p 3000:3000 -d movies-api`

## Example

https://andrsdev-movies-api.herokuapp.com/api/movies

### Other

- [How to configure commitlint](https://commitlint.js.org/#/)
- This is part of a [Platzi Javascript Course](https://platzi.com/clases/backend-nodejs/).
