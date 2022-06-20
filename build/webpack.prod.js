const path = require('path')

const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const baseConfig = require('./webpack.base')
const PATHS = {
  src: path.join(__dirname, '../src')
}

const prodConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, '../public/react.dll.js'), to: path.join(__dirname, '../dist/react.dll.js') }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
})

module.exports = prodConfig
