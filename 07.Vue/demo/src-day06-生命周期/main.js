import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')