#!/usr/bin/env node
"use strict"

require('babel-core/register')()

const CONFIG = require('./')

const key = process.argv[2] || ''
const value = CONFIG(key)
console.info(JSON.stringify(value, null, 2))
