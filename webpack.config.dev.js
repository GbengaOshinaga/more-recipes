const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: process.env.NODE_ENV,
  entry: ['webpack-hot-middleware/client?reload=true', './client/src/index.js'],
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client/src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(envKeys),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new webpack.ProgressPlugin()
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
  }
};
