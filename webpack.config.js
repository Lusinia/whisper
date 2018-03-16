const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: 'node',
  externals: [nodeExternals()],
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: [
      `${root}/node_modules`,
      'node_modules'
    ]
  },
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
        }
      ]
    }]
  }
};

/*
  {
      test: /\.js?$/,
      include: [path.join(__dirname, 'src')],
      exclude: [/node_modules/],
      loader: "babel-loader",
      options: {
        presets: [
          ['env', {
            'targets': {
              'node': 'current'
            }
          }]
        ]
      }
    }
 */