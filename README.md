# QuickFresh Bundle Builder Proxy App

## Start development mode

- Copy .env.example to .env and set the variables

To start the react application run:

#### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn start:server`

Launches the express server

#### `yarn build`

Builds the app for production to the `public` folder.\
It generates a `bundle.js` file

## Shopify Configuration for the App Proxy

Example:

- Subpath prefix: `a`
- Subpath: `proxy`

  - In this case you will have to set your `SHOPIFY_PROXY_APP_BASENAME` variable to `/a/proxy`

- Proxy URL: `https://some-url.com`
  - Development example: https://your-address.ngrok.io
