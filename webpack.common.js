const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = dotenv.config().parsed || process.env;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'client/src/index.js'),
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'client/src/index.html' }),
    new webpack.DefinePlugin(envKeys),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: path.join(__dirname, 'client/src'),
        loader: 'babel-loader',
        query: {
          plugins: ['@babel/transform-runtime'],
          presets: ['@babel/preset-env']
        }
      },
      { test: /\.(png|svg|jpg|gif)$/, use: [{ loader: 'file-loader' }] },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } },
              'sass-loader'
            ]
          },
          {
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } },
              'sass-loader'
            ]
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `lib.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};
