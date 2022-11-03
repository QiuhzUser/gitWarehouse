const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 打包的时候不会有map文件
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { "^/api": "" },
      },
    },
  },
});
