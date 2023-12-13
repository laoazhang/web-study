const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 3000, //开发服务器端口
    open: true
  },
  lintOnSave: false,//代码重新启动时，关掉eslist校验
})
