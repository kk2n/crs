const path = require('path')
const argv = require('yargs').argv
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Pages = require('./pages.config')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
let entry = {}
let html = []
Pages.filter(page => page.publish).forEach(page => {
  page.url = page.url ? page.url + '/' : page.url
  entry[`${page.url}index`] = `./src/${page.url}index.js`
  html.push(
    new HtmlWebpackPlugin({
      template: `./src/${page.url}index.html`,
      filename: `${page.url}index.html`,
      favicon: `./src/${page.url}/favicon.ico`,
      chunks: ['runtime', 'common', 'vendor', `${page.url}index`],
      chunksSortMode: 'none',
      hash: true,
      cache: true,
      showErrors: true
    })
  )
})
// 生产下 移动文件
const moveFile =
  argv.mode !== 'development'
    ? [
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/asset/uedit', to: 'asset/uedit' },
            { from: 'src/asset/img', to: 'asset/img' }
          ]
        })
      ]
    : []

console.log('###########')
console.log('请访问：' + argv.host + ':' + argv.port)
console.log('##########')

module.exports = {
  devServer: {
    //设置多个服务目录
    contentBase: [path.join(__dirname, 'src')],
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    proxy: {
      '/WebAPI/uploadfile': {
        target: 'https://global.talk-cloud.net',
        secure: false
      }
    }
  },
  optimization:
    argv.mode === 'development'
      ? {}
      : {
          runtimeChunk: 'single',
          minimize: true,
          splitChunks: {
            minSize: 30000,
            name: true,
            cacheGroups: {
              // 注意: priority属性
              // 其次: 打包业务中公共代码
              common: {
                name: 'common',
                chunks: 'all',
                priority: 0
              },
              // 首先: 打包node_modules中的文件
              vendor: {
                name: 'vendor',
                chunks: 'async',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                reuseExistingChunk: true
              }
            }
          }
        },
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: argv.mode === 'development' ? '/' : '/',
    filename: 'asset/[name]-[hash:5].js',
    chunkFilename: 'asset/[name]-chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // plugins: [['import', { libraryName: 'antd', style: true }]],
              cacheCompression: false
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      },
      // 处理样式文件
      {
        test: /\.(scss)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: argv.mode !== 'development'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // 处理样式文件
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: argv.mode !== 'development'
            }
          }
        ]
      },
      // 处理html
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, 'assets')
            }
          }
        ]
      },
      // 处理其他资源.
      {
        test: /\.(png|jpg|jpeg|gif|csv)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: '[path][name].[hash:5].[ext]',
              context: './src'
            }
          }
        ]
      },
      {
        test: require.resolve('moment'),
        use: [
          {
            loader: 'expose-loader',
            options: 'moment'
          }
        ]
      }
    ]
  },
  plugins: [
    ...html,
    new InlineManifestWebpackPlugin('runtime'),
    ...moveFile,
    new webpack.HotModuleReplacementPlugin({})
  ]
}
