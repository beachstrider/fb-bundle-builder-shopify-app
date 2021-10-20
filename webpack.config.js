const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
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
      'process.env.SHOPIFY_PROXY_APP_BASENAME': JSON.stringify(
        process.env.SHOPIFY_PROXY_APP_BASENAME || '/a/proxy'
      ),
      'process.env.PROXY_APP_URL': JSON.stringify(process.env.PROXY_APP_URL)
    })
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    static: path.resolve(__dirname, './public')
  }
}
