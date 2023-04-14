'use strict'

const { merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const PROD = process.env.NODE_ENV === 'development'

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  plugins: [
    new RemoveEmptyScriptsPlugin({ extensions: ['css.ts'] }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].min.css'
    }),
    new CleanWebpackPlugin(),
    new AssetsPlugin({
      path: 'public/',
      filename: 'manifest.json',
      fullPath: false
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
  optimization: {
    minimize: !PROD,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: true,
            annotation: true
          }
        }
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: true
          }
        }
      })
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  target: ['web', 'es5']
})
