# Reactive Gallery

This is a React image gallery web app. It uses a NodeJS/Express backend, which can be found in the `server` directory.

It is used live at [Roger Stanger Photography](https://rstanger.co.uk). 
The project was built for this deployment so there isn't a huge amount of customisation ability out of the box.

## Setup

- Run `yarn` to install dependencies
- Create `server/config.json` with the following schema:

```json
{
  "port": 9000,
  "tokenLife": "365d",
  "uploadPath": "/path/to/photo/storage",
  "secret": "SOME-LONG-RANDOM-STRING",
  "database": {
    "host": "localhost",
    "database": "",
    "username": "",
    "password": "",
    "dialect": "mariadb"
  }
}
```

- Edit the settings in `src/config.json`.
- Run `yarn build` to build the server and client
- Copy the contents of `build` to a web server root
- Run `yarn start:server` to start the server. 
    - This is the same as `node build_server`. Use this to set up a service for the web server.

**NOTE**: The requests from the client are structured in such a way they expect the server and client to share the same host address.
This gives you three options for deployment:
    
   - Configure your web server to proxy any requests on `/api` to the Node server.
   - Adjust `src/services/ImageService.ts` and `src/services/UserService` to fetch from a different origin.
   - Use the Webpack dev server to automatically proxy traffic with `yarn start:client` (not recommended, but good for testing).
        - You can use `yarn start` to start the server and client concurrently. 