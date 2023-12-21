import { loginApi } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

const state = {
  token: getToken() || ''
}

const mutations = {
  setToken: (state, newToken) => {
    state.token = newToken
    setToken(newToken)
  }
}

const getters = {

}

// 异步操作
const actions = {
  login(context, data) {
    loginApi(data).then((res) => {
      const token = res.data.data
      context.commit('setToken', token)
    })
  }
}

export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
