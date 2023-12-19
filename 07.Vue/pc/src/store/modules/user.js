// 存放都是有关用户共享数据
// token
// 用户名
const user = {
  namespaced: true,
  // 初始化 数据
  state () {
    return {
      token: localStorage.getItem('pc-token')
    }
  },
  // 操作数据方法
  mutations: {
    // 设置
    set (state, value) {
      localStorage.setItem('pc-token', 'Bearer ' + value) // BOM：浏览器
      state.token = value // 数据中心 数据也要去设置
    },
    // 删除
    del (state, value) {
      localStorage.removeItem('pc-token')
      state.token = ''
    }

  }
}

export default user
