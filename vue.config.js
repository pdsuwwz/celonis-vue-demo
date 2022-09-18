
module.exports = {
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_ROUTER_MODE === 'hash'
    ? ''
    : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Celonis Vue Demo'
        return args
      })
  },
}