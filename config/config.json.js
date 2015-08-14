var fs = require('fs')
var path = require('path')
var minimist = require('minimist')
var merge = require('merge')
var flat = require('flat')

// Application Root
var ROOT = path.join(__dirname, '..')

// get dot.nested CLI args
// use 'appconfig' instead of '--config' flag to
// temporarily get around conflict with --config webpack cli arg
var argvConfig = flat.unflatten(minimist(process.argv.slice(2), {
  default: {
    // the only hardcoded config should be default location of appconfig
    appconfig: path.join(ROOT, 'app.config.js')
  }
}))

// if user passed in a custom --appconfig, resolve against cwd.
var baseConfigPath = path.resolve(process.cwd(), argvConfig.appconfig)
var baseConfig = readConfigFileSync(baseConfigPath)

var env = process.env.NODE_ENV || 'dev'
var envConfig = {}

// add environment config
// e.g. config.development.js, config.test.js, config.production.js, etc
if (env) {
  var ext = path.extname(baseConfigPath)
  var fileName = path.basename(baseConfigPath, ext)
  var dirName = path.dirname(baseConfigPath)
  var envConfigPath = path.join(dirName, fileName + '.' + env + ext)
  // ignore if file does not exist
  if (fs.existsSync(envConfigPath)) {
    envConfig = readConfigFileSync(envConfigPath) || {}
  }
}

// cli args have highest priority
var config = merge.recursive({}, baseConfig, envConfig, argvConfig)

function readConfigFileSync(filePath) {
  console.error('Reading', path.relative(process.cwd(), filePath))
  return flat.unflatten(require(filePath))
}

function isWebPack() {
  return !!module.parent.loaders
}

module.exports = config
