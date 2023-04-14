'use strict'

const path = require('path')

const PROD = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: {
    app: ['/src/script/app.ts']
  },
  output: {
    filename: PROD ? '[name].js' : '[name].[hash:8].min.js',
    path: path.resolve(__dirname, 'public')
  }
}
