var objectPath = require('object-path')
var config = require('./config.json.js')

var CONFIG_STRICT = parseInt(process.env.CONFIG_STRICT, 10)
if (isNaN(CONFIG_STRICT)) CONFIG_STRICT = 3

module.exports = function(p, defaultValue) {
  var value = objectPath.get(config, p)
  if (value != null) return value

  var err = new Error("No config value for " + p)

  switch (CONFIG_STRICT) {
    case 0: // not strict
      return defaultValue
    case 1: // warns
      err.name = "Warn"
      console.warn(err.stack)
      return defaultValue
    case 2: // throws on missing value + missing default
      if (defaultValue == null) throw err
      err.name = "Warn"
      console.warn(err.stack)
      return defaultValue
    case 3:
    default: // ignores defaults
      if (value == null) throw err
      break
  }
  return defaultValue
}
