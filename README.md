# QuickFresh Bundle Builder Proxy App

## Start development mode

- Copy .env.example to .env and set the variables

### Opening the app in Shopify

In one terminal, run:

#### `yarn dev`

It generates and watch the `bundle.js` file

In a second terminal run:

#### `yarn server`

### Using Only React

To start the react application with hot reloading run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Building the app

#### `yarn build`

Builds the app for production to the `public` folder.\
It generates a `bundle.js` file

## Shopify Configuration for the App Proxy

Example:

- Subpath prefix: `a`
- Subpath: `proxy`

- Proxy URL: `https://some-url.com`
  - Development example: https://your-address.ngrok.io
