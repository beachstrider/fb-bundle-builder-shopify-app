const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  entry: [
    'regenerator-runtime/runtime.js',
    path.resolve(__dirname, './src/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.join(__dirname, 'tests'),
          path.join(__dirname, 'node_modules')
        ],
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENVIRONMENT': JSON.stringify(process.env.NODE_ENV),
      'process.env.LOGO_URL': JSON.stringify(process.env.LOGO_URL),
      'process.env.PROXY_APP_URL': JSON.stringify(process.env.PROXY_APP_URL),
      'process.env.PAGE_TITLE': JSON.stringify(process.env.PAGE_TITLE),
      'process.env.LOCAL_STORAGE_KEY': JSON.stringify(
        process.env.LOCAL_STORAGE_KEY
      ),
      'process.env.BUNDLE_API_URL': JSON.stringify(process.env.BUNDLE_API_URL),
      'process.env.EMPTY_STATE_IMAGE': JSON.stringify(
        process.env.EMPTY_STATE_IMAGE
      ),
      'process.env.SHOPIFY_API_VERSION': JSON.stringify(
        process.env.SHOPIFY_API_VERSION
      ),
      'process.env.SENTRY_DSN': JSON.stringify(
        process.env.SENTRY_DSN
      ),
      'process.env.SENTRY_SAMPLE_RATE': JSON.stringify(
        process.env.SENTRY_SAMPLE_RATE
      ),
      'process.env.SENTRY_ENVIRONMENT': JSON.stringify(
        process.env.SENTRY_ENVIRONMENT
      )
    }),
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "sunrise-integration",
      project: "bundle-builder-proxy",

      // other SentryWebpackPlugin configuration
      include: ".",
      ignore: ["node_modules", "webpack.config.js", "tests"],
    }),
  ],
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'bundle.js'
  },
  devServer: {
    static: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    hot: true
  },
  devtool: 'source-map'
}
