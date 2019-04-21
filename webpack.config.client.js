const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: parseInt(
      process.env.CLIENT_PORT
    ),
    host: '0.0.0.0',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve(
          'babel-loader'
        ),
        options: {
          // include: path.resolve(__dirname, 'client'),
          include: './client',
          cacheDirectory: true,
          plugins: [
            'react-hot-loader/babel',
          ],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(
      __dirname,
      'dist'
    ),
  },
};
