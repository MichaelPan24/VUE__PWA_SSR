const path = require('path')

const resolvePath = (file) => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const projectConfig = require('./config')

module.exports = {
  publicPath: isProd ? projectConfig.build.assetsPublicPath : projectConfig.dev.assetsPublicPath,
    lintOnSave: !isProd,
    //在浏览器同时显示警告和错误
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },
    productionSourceMap: !isProd, //再生产环境加速构建
  // 构建多页面应用时使用
  // pages: {
  //     index: {
  //         // page 的入口
  //         entry: 'src/index/main.js',
  //         // 模板来源
  //         template: 'public/index.html',
  //         // 在 dist/index.html 的输出
  //         filename: 'index.html',
  //         // 当使用 title 选项时，
  //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //         title: 'Index Page',
  //         // 在这个页面中包含的块，默认情况下会包含
  //         // 提取出来的通用 chunk 和 vendor chunk。
  //         chunks: ['chunk-vendors', 'chunk-common', 'index']
  //       },
  //       // 当使用只有入口的字符串格式时，
  //       // 模板会被推导为 `public/subpage.html`
  //       // 并且如果找不到的话，就回退到 `public/index.html`。
  //       // 输出文件名会被推导为 `subpage.html`。
  //       subpage: 'src/subpage/main.js'
  // },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
    config.module.rule('eslint').uses.clear()
    config.module.rule('eslint').clear()
    if (process.env.VUE_CLI_SSR_TARGET === 'client') {
      config.resolve.alias.set('~api', resolvePath('.src/api/client/'))
    } else {
      config.resolve.alias.set('~api', resolvePath('.src/api/server/'))
    }
  },
  css: {
    loaderOptions: {}
  },
  pluginOptions: {
    ssr: {
      port: 8080,
      host: null,
      entry: target => `./src/entry/entry-${target}`,
      defaultTitle: '自律给我自由',
      skipRequests: req => req.originalUrl === '',
      nodeExternalWhitelist: [/\.css$/, /\?vue&type=style/],
      extendServer: app => {
        const logger = require('morgan')
        app.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
        const bodyParser = require('body-parser')
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        const cookieParser = require('cookie-parser')
        app.use(cookieParser())

        app.set('views', resolvePath('./dist'))
        app.set('view engine', 'html')
      },
      distPath: resolvePath('./dist'),
      error500Html: null,
      templatePath: resolvePath('./dist/index.html'),
      serviceWorkerPath: resolvePath('./dist/service-worker.js'),
      directives: {

      }
    }
  },
  devServer: {

  },
  pwa: {
    name: 'KEEP',
    themeColor: '',
    msTileColor: ''

  }
}
