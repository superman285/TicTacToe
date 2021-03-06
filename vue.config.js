const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: "./",

  devServer: {
    port: 3000,
    // 服务器返回浏览器的时候是否启动gzip压缩
    compress: true,
    //close eslint tips
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ]
    },
    plugins: [
      new CompressionPlugin()
      //new BundleAnalyzerPlugin(),
    ]
  }
};
