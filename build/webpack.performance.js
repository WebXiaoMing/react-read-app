const prodConfig = require('./webpack.prod')
const baseConfig = require('./webpack.base')
const { merge } = require('webpack-merge')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = new SpeedMeasureWebpackPlugin().wrap(
  merge(prodConfig, {
    plugins: [new BundleAnalyzerPlugin()],
  })
)
module.exports = config
