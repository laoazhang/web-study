import { getProfileAPI, loginAPI } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => {
    return {
      // 优先从本地取
      token: getToken() || '',
      profile: {}
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
      state.profile = {}
      removeToken()
    },
    setProfile(state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // 1. 调用接口
      const { data } = await loginAPI({ username, password })
      // 2. 提交mutation
      commit('setToken', data.token)
    },
    async getProfile(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setProfile', res.data)
      // 这里如果想要当前函数内的数据给到另外一个js模块使用
      // 直接把目标数据return出去
      return res.data.permissions
    }
  }
}
