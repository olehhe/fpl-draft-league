var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
  entry: './src/app/scripts/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    alias: {},
    modulesDirectories: ['node_modules', 'shared']
  },
  plugins: [
    new webpack.ProvidePlugin({}),

    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    })
  ]
};
