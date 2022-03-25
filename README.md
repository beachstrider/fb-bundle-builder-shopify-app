# QuickFresh Bundle Builder Proxy App

## Start development mode

- Copy .env.example to .env and set the variables

## Create a private app

- In your Shopify admin, go to Apps
- Manage private apps
- Create an app with permission to `read` `customers`
- Copy the api key and secret to use on your .env file

## Configuring the .env file

`NODE_ENV` Your environment. It can be 'development' or 'production' <br>
`PROXY_APP_URL` Example: https://your-app.ngrok.io <br>
`STORE_SETTINGS_KEY` Example: `company_abc`, for available options check `src/store/settings/settings.js`<br>

`REQUEST_TOKEN_SECRET` Used to make sure that a request is coming from the app <br>
`REQUEST_TOKEN_DURATION` How long the token should be valid (in seconds) <br> <br>

`LOCAL_STORAGE_KEY` Local storage key. Example: bundleApp <br>
`EMPTY_STATE_IMAGE` Use an public image example https://... <br><br>

`BUNDLE_API_URL` Example "http://localhost:8080" this is the url for the API <br>
`BUNDLE_API_SECRET` Secret used for the API app <br><br>

`SHOPIFY_API_SECRET` Shopify API secret (this is the API Password in Shopify Admin) <br>
`SHOPIFY_API_VERSION` Example: 2022-01 <br>
`SHOPIFY_PRIVATE_APP_API_SECRET` Create a private Shopify app and copy the password <br>
<br>
`SHOPIFY_MULTIPASS_SECRET` Please enable multipass in Shopify and paste the secret <br>
`SHOPIFY_MULTIPASS_SHOP` Default shop in case of this value have not being defined in the query string <br>
`SHOPIFY_BUNDLES_COLLECTION` Will be the bundles' collection<br>
`SHOPIFY_PRODUCTS_COLLECTION` Menu items<br><br>

`LOGO_URL` Company's logo url starting with https://<br>
`PAGE_TITLE` Example: QuickFresh <br>
`PAGE_DESCRIPTION` Description for Shopify liquid (string) <br>

`SENTRY_DSN` Sentry DSN <br>
`SENTRY_SAMPLE_RATE` Sentry sample rate (example: 0) <br>
`SENTRY_ENVIRONMENT` Sentry environment (example: local) <br> <br>

`RECHARGE_API_TOKEN` Token from Recharge platform <br>

## Configuring Shopify Products Collection

Env variable: SHOPIFY_PRODUCTS_COLLECTION

1. In the Shopify Admin, go to `Settings``
2. On the left menu, click on `Metafields`, `Variants`
3. Add these metafields: <br >
   <br> `Net Carbs` | Namespace and key: `my_fields.net_carbs`) | Measurement: `Weight`
   <br> `Protein` | Namespace and key: `my_fields.protein`) | Measurement: `Weight`
   <br> `Calories` | Namespace and key: `my_fields.calories`) | Measurement: `Weight`
   <br> `Total Fat` | Namespace and key: `my_fields.total_fat`) | Measurement: `Weight`
   <br> `Subtitle` | Namespace and key: `nutrition.subtitle`) | Measurement: `Text (multi-line text)`
   <br> `Contains` | Namespace and key: `nutrition.contains`) | Measurement: `Text (multi-line text)`
   <br> `Ingredients` | Namespace and key: `nutrition.ingredients`) | Measurement: `Text (multi-line text)`
   <br> `Calorie Range` | Namespace and key: `nutrition.calorie_range`) | Measurement: `Text (single line text)`
   <br> `Average Macros` | Namespace and key: `nutrition.average_macros`) | Measurement: `Text (single line text)`
   <br> `Gluten Free` | Namespace and key: `nutrition.is_gluten_free`) | Content Type: `True or False`
   <br> `Dairy Free` | Namespace and key: `nutrition.is_dairy_free`) | Content Type: `True or False`
   <br> `Peanut` | Namespace and key: `nutrition.is_peanut_free`) | Content Type: `True or False`
   <br> `Spicy` | Namespace and key: `nutrition.is_spicy`) | Content Type: `True or False`
4. Go back to On the left menu, click on `Metafields`, `Products` and add these metafields: <br>
   <br> `Bundle Key Points` | Namespace and key: `bundle-builder.balanced_bundle_key_points`) | Measurement: `Text (multi-line text)`
   <br> `Bundle Key Points` | Namespace and key: `bundle-builder.keto_bundle_key_points`) | Measurement: `Text (multi-line text)`
   <br> `Protein` | Namespace and key: `nutrition.balanced_protein`) | Measurement: `Text (single line text)`
   <br> `Protein` | Namespace and key: `nutrition.keto_protein`) | Measurement: `Text (single line text)`
   <br> `Net Carbs` | Namespace and key: `nutrition.balanced_net_carbs`) | Measurement: `Text (single line text)`
   <br> `Net Carbs` | Namespace and key: `nutrition.keto_net_carbs`) | Measurement: `Text (single line text)`
   <br> `Fat` | Namespace and key: `nutrition.balanced_fat`) | Measurement: `Text (single line text)`
   <br> `Fat` | Namespace and key: `nutrition.keto_fat`) | Measurement: `Text (single line text)`
5. Go to your collection and add values to each metafield, for all your variants and products

## Configuring Shopify Bundles

Env variable: SHOPIFY_BUNDLES_COLLECTION

1. In the Shopify Admin, go to `Collections`
2. Select the collection that you configured for the env variable above
3. Add these tags to the respect bundle(product): <br >
   <br>`7 Day with breakfast` | `7 Day`
   <br>`5 Day with breakfast` | `5 Day`
   <br>`3 Day with breakfast` | `3 Day`

### Opening the app in Shopify

In one terminal, run:

#### `yarn dev` / `npm run dev`

It generates and watch the `bundle.js` file

In a second terminal run:

#### `yarn server` / `npm run server`

### Using Only React

To start the react application with hot reloading run:

#### `yarn start` / `npm run start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Building the app

#### `yarn build` / `npm run build`

Builds the app for production to the `public` folder.\
It generates a `bundle.js` file

## Shopify Configuration for the App Proxy

Example:

- Subpath prefix: `a`
- Subpath: `proxy`

- Proxy URL: `https://some-url.com`
  - Development example: https://your-address.ngrok.io

## Shopify Configuration for the Multipass

- Enable multipass following the steps on this website: https://shopify.dev/api/multipass
