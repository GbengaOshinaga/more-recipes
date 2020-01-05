const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'client/src/index.js'),
  target: 'web',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client/dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(envKeys),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        include: path.join(__dirname, 'client/src'),
        loader: 'babel-loader',
        query: {
          plugins: ['@babel/transform-runtime'],
          presets: ['@babel/preset-env']
        }
      },
      { test: /(\.jpg)$/, use: [{ loader: 'file-loader' }] },
      { test: /(\.png)$/, use: [{ loader: 'file-loader' }] },
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
  }
};
