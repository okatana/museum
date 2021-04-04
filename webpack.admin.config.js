const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildDirectory = 'dist';
const outputDirectory = `${buildDirectory}/tickets`;
module.exports = () => {
  const envPath = path.join(__dirname) + '/src/client/.env.development';
  const env = dotenv.config({ path: envPath}).parsed;
/*
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
*/

  return {
    mode: 'development',
    entry: './src/client/admin/index.js',
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            }
          ],
        }
      ],
    },
    devServer: {
      port: 3001,
      open: true,
    },
    plugins: [
//      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config({ path: envPath}).parsed) // it will automatically pick up key values from .env file
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
      }),
      new HtmlWebpackPlugin({
        template: './public/admin/index.html',
      }),
    ],
  }
};
