// module.exports = {
//   css: {
//     loaderOptions: {
//       scss: {
//         additionalData: `@import "~@/assets/variables.scss"; @import "~@/assets/base.scss";`
//       },
//     }
//   },
//   lintOnSave: false,
// }

const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/variables.scss"; @import "~@/assets/base.scss";`
      },
    }
  },
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true
    },
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
})
