'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
require('dotenv').config()
// let dotenv = require('dotenv').config({ path: __dirname + '/.env'})
// let env = merge(prodEnv, dotenv)
// console.log('prodEnv', prodEnv)
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PROJECT: JSON.stringify(process.env.PROJECT),
  GOOGLE_APPLICATION_CREDENTIALS: JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS)
})
