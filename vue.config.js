module.exports = {
  publicPath: "./",

  devServer: {
    port: 3000,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
  },
  productionSourceMap: false,

  configureWebpack: {

  }
};
