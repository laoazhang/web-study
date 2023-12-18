// 单独定义商品 分数据中心
const goods = {
  // 开启命名空间：模块内变量、方法等局部化，不和其他模块内数据变量冲突！
  namespaced: true,

  // 下面：四大部分
  state() { // 特别像组件化内初始化data
    return {
      count: 99,
      price: 67.8,
      num: 7777777777777,
    }
  },

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

  actions: {
    getServer(store, value) {
      setTimeout(() => {
        store.commit('reset', 88888)
      }, 1000);
    }
  },

  getters: {
    all(state) {
      return state.count * state.price * 0.75;
    }
  }
};


export default goods;