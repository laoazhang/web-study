// app.js
// App函数执行后，在微信客户端注册小程序，注册之后会伴随着执行一些生命周期钩子函数
App({
  // 1. 默认小程序启动会执行前两个
  // 小程序启动时
  onLaunch(res) {
    // 全局只会触发1次
    // res.scene 场景值作用：统计小程序打开方式 => 更有针对性的引流 => 创造价值
    // 前端：调用后台接口计算数量
    console.log('小程序启动了...',res);
  },
  // 小程序前台运行时 => 前台运行会执行
  onShow(res) {
    // 重复执行
    console.log('小程序前台运行了...',res);
  },
  // 小程序后台运行时 => 后台运行会执行
  onHide: function () {
    // 重复执行
    console.log('小程序后台运行了...');
  },
  // 执行错误时
  onError: function (err) {
    console.log('出错啦!!!');
  },
  // 冷启动（如扫码）打开小程序的页面不存在时
  onPageNotFound: function () {
    console.log('你找到页面去火星了？？？');
  }
})
