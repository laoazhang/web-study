/**
 * 需求：借助vue插件语法，提供全局方法request
 * 语法：{ install(Vue) {注册全局方法}}
 */

import request from './request'
export default {
  install(Vue) {
    // 把封装的request方法挂载到全局
    Vue.prototype.request = request
  },
}
