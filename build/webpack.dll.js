const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    react: ['react', 'react-dom', 'redux'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../public'),
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../public/[name].json'),
    }),
  ],
}
