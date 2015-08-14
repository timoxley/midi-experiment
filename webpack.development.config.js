/**
 * Apply development-specific webpack configuration.
 */

'use strict'

var webpack = require('webpack')
var path = require('path')
var Config = require('webpack-config')

// load optional webpack-notifier
var WebpackNotifierPlugin

module.exports = function (config) {
  try { // WebpackNotifierPlugin is optional
    WebpackNotifierPlugin = require('webpack-notifier')
    config.plugins.push(new WebpackNotifierPlugin({alwaysNotify: true}))
  } catch(e) {} // ignore err

  // must load after existing loaders
  // thus must use unshift
  config.module.loaders.unshift({
    // react hot loading
    test: /\.jsx?$/,
    loaders: ['react-hot'],
    include: path.join(__dirname, 'client')
  })

  return Config.fromObject(config).merge({
    devtool: 'source-map',
    stats: stats(),
    module: {
      preLoaders: [
        // lint code with standard
        {test: /\.js$/, loader: 'standard', exclude: /node_modules/}
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // do not watch anything inside node_modules
      new webpack.WatchIgnorePlugin([
        path.resolve(__dirname, './node_modules/')
      ])
    ],

    standard: {
      parser: 'babel-eslint'
    },
    profile: process.env.NODE_ENV === 'profile' // collect build stats
  }).toPlainObject()
}

// tidier output
function stats () {
  return {
    colors: true,
    reasons: true, // verbose errors
    chunks: process.env.NODE_ENV === 'profile', // clean summary output
    timings: true,
    chunks: false, // clean summary output
    children: false // disable extract-text-webpack-plugin noise
  }
}

