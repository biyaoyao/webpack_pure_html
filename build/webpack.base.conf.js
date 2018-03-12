let path = require('path')
let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')

let glob = require('glob');
let entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
let chunks = Object.keys(entries);

if(process.env.NODE_ENV==='development'||process.env.NODE_ENV==='production'){//开发环境用单页面
  entries = {
    app: './src/main.js'
  }
}

let projectRoot = path.resolve(__dirname, '../')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {

  entry:entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader','eslint-loader'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(less)$/,
        loader:[ 'style-loader','css-loader','less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader?stage=0'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    /*
     // 提取公共模块
     new webpack.optimize.CommonsChunkPlugin({
     name: 'vendors', // 公共模块的名称
     chunks: chunks,  // chunks是需要提取的模块
     minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

     }),*/

  ]
}
module.exports =  webpackConfig;
