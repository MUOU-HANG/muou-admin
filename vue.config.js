/*
 * @Description:
 * @Author: ZHAN HANG
 * @Date: 2020-05-05 17:08:16
 * @LastEditTime: 2020-05-15 20:40:57
 * @LastEditors: ZHAN HANG
 */
const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  assetsDir: 'assets',
  lintOnSave: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
    config.resolve.symlinks(true) //热更新
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json'],//请求本地json
        alias: {
          'vue': 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './src'),
          '@components': path.resolve(__dirname, './src/components'),
          '@pages': path.resolve(__dirname, './src/pages')
        } // 别名配置
      }
    })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/main.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  parallel: require('os').cpus().length > 1,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/devApi': {
        // 目标 API 地址
        // // target: process.env.VUE_APP_URL,
        target: "http://www.web-jshtml.cn/productapi/token",
        // 如果要代理 websockets
        ws: false,
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/devApi': ''
        }
      }
    },
    // 代理转发配置，用于调试环境
    disableHostCheck: true,
  }
}