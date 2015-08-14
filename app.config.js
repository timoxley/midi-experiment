"use strict"

module.exports = {
  server: {
    port: 4560,
    morgan: {
      format: 'dev'
    }
  },
  webpack: require('./webpack.config')
}
