'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// isolate css
var cssExtract = new ExtractTextPlugin('[name].css', {
  allChunks: true
})

var config = {
  entry: {
    bundle: [
      './client/index'
    ],

    // push all libs out into separate bundle
    libs: [
      'react'
    ]
  },

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].bundle.js'
  },

  stats: {
    children: false // disable noise
  },

  plugins: [
    cssExtract,
    new webpack.optimize.CommonsChunkPlugin('libs', 'libs.bundle.js'), // break up libs
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        // Use .json.js extension to bake exported js data into json
        test: /\.json\.js/,
        exclude: /(node_modules|bower_components)/,
        loader: 'tojson-loader'
      },

      {
        // ES6 transform
        test: /\.jsx?$/,
        loader: 'babel-loader?optional[]=runtime',
        include: path.join(__dirname, 'client')
      },

      {
        // use modern css
        test: /\.css$/,
        loader: cssExtract.extract('style-loader', 'css-loader!cssnext-loader')
      },

      // raster images
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },

      {
        // index.html
        test: /index.html$/,
        loader: 'file-loader?name=index.html'
      },

      {
        // fonts/svg
        // will inline if smaller than 30kb
        test: /\.(eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=30000?name=[path][name].[ext]'
      },

      {
        // favicons
        test: /\/(apple-touch-icon|favicon)/,
        loader: 'file-loader?name=[name].[ext]',
        include: path.join(__dirname, 'assets')
      },

      // Load JSON files like Node does
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  cssnext: {
    browsers: 'last 2 versions'
  }
}

var env = process.env.NODE_ENV || 'development'

module.exports = require('./webpack.'+env+'.config')(config)
