import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
// 1. 导入搜索组件
import Search from '@/components/search.vue'

Vue.config.productionTip = false

App.mpType = 'app'

// 2. 注册全局组件
Vue.component('Search', Search)

const app = new Vue({
  ...App,
})
app.$mount()
