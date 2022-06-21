const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
  entry: path.join(__dirname, '../src/main.tsx'),
  output: {
    filename: isDev ? 'bundle.js' : '[name].[chunkhash:8].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    clean: !isDev,
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'scss-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(ts|js)?x$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
            },
          },
          'babel-loader?cacheDirectory=true'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../public/react.json')
    })
  ],
  stats: 'normal',
}
module.exports = baseConfig
