'use strict'

const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = merge(commonConfig, {
  watch: true,
  plugins: [
    new RemoveEmptyScriptsPlugin({ extensions: ['css.ts'] }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new AssetsPlugin({
      path: path.join(__dirname, 'public'),
      filename: 'manifest.json',
      fullPath: false
    }),
    new BrowserSyncPlugin({
      notify: false,
      host: 'localhost',
      port: 3000,
      files: ['./**/*.php'],
      proxy: 'http://localhost:8000'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  }
})
