
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const casProxy = require('./proxy');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PORT = 3010

module.exports = {
  entry: {
    client: './app/client.js',
    a: ['immutable'],
    vendor: [
      'react', 'classnames', 'react-router', 'react-dom',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions',
      api: __dirname + '/app/api',
      reducers: __dirname + '/app/reducers',
      utils: __dirname + '/app/utils',
      constants: __dirname + '/app/constants',
      controllers: __dirname + '/app/controllers',
      style: __dirname + '/app/style',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        // loader: 'react-hot!babel', // 暂时不用react-hot-loader
        loader: 'babel',
      },
      {
        test: /\.less$/,
        // loader: 'style!css!postcss!less',
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=<true></true>'),
      },
      {
        test: /\.css/,
        // loader: 'style!css',
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=<true></true>'),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'file-loader?name=iconfont/[path][name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new ExtractTextPlugin('vendor.[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 入口文件名
      filename: 'vendor.bundle.js', // 打包后的文件名
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './app/',
    historyApiFallback: false,
    hot: false,
    host: '0.0.0.0',
    port: PORT,
  },
}
