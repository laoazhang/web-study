import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
// 1. 导入搜索组件
import Search from '@/components/search.vue'
// 导入插件
import plugins from '@/utils/plugins'

Vue.config.productionTip = false

App.mpType = 'app'

// 2. 注册全局组件
Vue.component('Search', Search)

// 注册插件
Vue.use(plugins)

const app = new Vue({
  ...App,
})
app.$mount()
