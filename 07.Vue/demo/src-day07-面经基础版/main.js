import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App
import router from './router' // 默认去文件夹下index.js



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')