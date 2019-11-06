# PTAngular

## Installation

Use NPM in order to install everything.

```bash
npm i
```

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200`.

## Running tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/docs/en/getting-started).

If you want watch mode: `npm run test:watch`'

## Production server

Run `npm run start:build` for a production server with node. Navigate to `http://localhost:4200`.

## Docker

build image
```docker
docker build -t ptangular
```

run container
```
docker run -p 4200:4200 ptangular
```

## Routes

> '/':
> 
>  will redirect to `/users`.
  
> '/users'
> 
>  user grid.
   
> '/userEdition/:id'
> 
>  receives an id and get the user information.
