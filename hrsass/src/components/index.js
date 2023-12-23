// import Vue from 'vue'

import PageTools from './PageTools'
// Vue.component('PageTools', PageTools)

// 使用VUe.use 注册插件这种方式来进行全局注册
// 插件可以使一个对象，也可以是一个方法
// 当插件是对象的时候，必须提供一个install方法
// 当插件是一个函数的时候，这个函数会被当作install方法调用
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

export default (Vue) => {
  Vue.component('PageTools', PageTools)
}
