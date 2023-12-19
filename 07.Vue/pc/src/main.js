import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element' // 直接导入vant-ui.js
import '@/styles/index.scss'
import axios from '@/utils/request'

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
