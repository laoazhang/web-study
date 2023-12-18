// 配置vuex ：文件夹名字不能vuex
//   0安装： npm i vuex@3.6.2

// 1. 引入vuex
import Vue from 'vue' // 需要导入
import Vuex from 'vuex'

// 2. 使用：背后Vuex挂载到vue原型对象上。this.$store
Vue.use(Vuex)


// 3. 实例化store对象，vuex配置项
const store = new Vuex.Store({
  // ************************************state：相当于组件内的初始化数据
  state: {
    count: 99,
    price: 67.8,



  },

  // ***********************************mutations：操作数据的一些方法！（同步：直接操作数据）
  // vuex数据管理中心：管理数据、操作数据！
  mutations: {
    // 方法名自定义，方法在哪用？在组件内部使用！
    add(state, value) {
      // state：初始化上面state数据
      // value：增加几个？由外面组件去决定，操作数据
      state.count += value;
    },
    sub(state, value) {
      state.count -= value;
    },
    reset(state, value) {
      state.count = value;
    }
  },

  // **********************************actions：
  // 真实数据：存在后台服务器中；
  actions: {
    // 获取服务器上数据
    //       1、store 数据存储中心
    //       2、获取到数据后，需要数据中心调用mutations里面方法才能重新设置count!
    getServer(store, value) {
      // store：代表就是vuex 数据存储中心！！！
      // value：没有什么用！数据来自于后台服务器！
      // 模拟服务器获取异步代码
      setTimeout(() => {
        // 获取后台数据，重新设置给count  store====>this.$store.commit()
        store.commit('reset', 88888)
      }, 1000);
    }
  },


  // **********************************getters:计算属性！
  // 总价：数量 * 单价 * 折扣！（组件内计算属性的简单写法）只有被计算！
  getters: {
    // all:计算属性的名字，自定义
    all(state) { // state：初始化数据
      return state.count * state.price * 0.75;
    }
  }


})


// 导出
export default store



// 很多数据：是否是属于同一类业务数据，vuex不管！
//          全部放在一起，维护起来不方便！（初始化、计算属性、操作数据等方法！）

// 解决：分类存放！数据（一切）都可以分类存放！modules: 模块化按照业务！