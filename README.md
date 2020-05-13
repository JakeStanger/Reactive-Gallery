# Reactive Gallery

This is a React image gallery web app. It uses a NodeJS/Express backend, which can be found in the `server` directory.

The gallery also includes support for a checkout using [Stripe](stripe.com).

It is used live at [Roger Stanger Photography](https://rstanger.co.uk), 
home to my dad's excellent photos, which you should definitely check out.

The project was built for this deployment so there isn't a huge amount of customisation ability out of the box. 
If any developers after a responsive photo gallery however, this will hopefully serve as a good starting point. 

## Setup

- Run `yarn` to install dependencies
- Copy `.env.example` to `.env` and fill in the environment variables.

- Edit the client settings in `src/config.json`.
- Edit the page content in `src/pageContent`
    - `contact/TextDescription.tsx` relies on a photo, which is not included in here. 
        Either put a `photo.jpg` in the same folder or remove the image from the component.
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
