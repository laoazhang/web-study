import { loginAPI } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => {
    return {
      // 优先从本地取
      token: getToken() || ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 本地存一份
      setToken(token)
    },
    clearUserInfo(state) {
      // 清除Token
      state.token = ''
      removeToken()
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // 1. 调用接口
      const { data } = await loginAPI({ username, password })
      // 2. 提交mutation
      commit('setToken', data.token)
    }
  }
}
