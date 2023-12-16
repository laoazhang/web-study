import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App
import router from './router' // 默认去文件夹下index.js



Vue.config.productionTip = false

// 4。关联到现有Vue实例，不是单独写！
new Vue({
    router,
    render: h => h(App),
  }).$mount('#app') // mount镶嵌到 #app（public/index.html div#app）