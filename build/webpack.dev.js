const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8080,
  },
  plugins: [],
  devtool: 'eval-cheap-module-source-map',
})

module.exports = devConfig
