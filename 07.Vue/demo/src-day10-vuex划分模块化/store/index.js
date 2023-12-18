import Vue from 'vue' // 需要导入
import Vuex from 'vuex'

Vue.use(Vuex)

import goods from "./modules/goods.js"
import user from "./modules/user.js"
const store = new Vuex.Store({
  // 存放分门别类的模块化数据
  modules: {
    // 模块名 ：导入变量对象
    goods,
    user
  },
})


// 导出
export default store