//配置vuex : 文件夹名字不能vuex
// 0安装： npm i vuex@3.6.2
// store/index.js - 创建定义导出store对象
// 1. 引入vuex
import Vue from 'vue';
import Vuex from 'vuex'

// 2. 注册
Vue.use(Vuex)

// 3. 实例化store对象
const store = new Vuex.Store({
    state: {
        count: 99,
        num: 100
    },
    mutations: {
        add(state, value) {
            state.count += value
        },
        sub(state, value) {
            state.count -= value
        },
        reset(state, value) {
            state.count = value
        }
    },
    actions: {
        getServer(store, value) {
            setTimeout(() => {
                store.commit('reset', 888)
            }, 1000)
        }
    }

})

// 4. 导出store对象
export default store