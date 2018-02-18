import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extract = new ExtractTextPlugin({ filename: 'style.css' });

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/src/index.js'
  ],
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
    new webpack.NoEmitOnErrorsPlugin()
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
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /(\.jpg)$/, use: [{ loader: 'file-loader' }] },
      { test: /(\.png)$/, use: [{ loader: 'file-loader' }] },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }]
      }
    ]
  }
};
