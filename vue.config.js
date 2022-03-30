module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/variables.scss"; @import "~@/assets/base.scss";`
      },
    }
  },
  lintOnSave: false,
}
