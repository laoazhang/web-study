import Vue from 'vue' //导入vue框架
import App from './App.vue' // 导入 组件App

Vue.config.productionTip = false

new Vue({
  render: h => h(App),  // render：渲染 App.vue组件
}).$mount('#app') // mount: 挂载 #app? index页面内标签!

//说明：导入哪个组件，就显示哪个组件