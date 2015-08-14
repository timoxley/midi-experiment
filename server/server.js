process.name = 'seq-server'

import './init' // for polyfills, error traps, etc

import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import serveStatic from 'serve-static'
import morgan from 'morgan'
import errorhandler from 'errorhandler'
import methodOverride from 'method-override'

import CONFIG from '../config'

import fs from 'fs'
import path from 'path'

const BUILD_DIR   = CONFIG('webpack.output.path')
const LOG_FORMAT  = CONFIG('server.morgan.format')
const LOG_OPTIONS = CONFIG('server.morgan')

const INDEX_HTML_PATH = path.join(BUILD_DIR, 'index.html')

module.exports = express()
.use(morgan(LOG_FORMAT, LOG_OPTIONS))
.use(methodOverride())
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.use(serveStatic(BUILD_DIR))
.use(compression())
.use((req, res) => {
  res.setHeader('content-type', serveStatic.mime.lookup(INDEX_HTML_PATH))
  res.send(fs.readFileSync(INDEX_HTML_PATH, 'utf8'))
})
