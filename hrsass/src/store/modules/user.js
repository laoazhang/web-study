import { loginApi, getUserInfoApi, getBaseUserInfoApi } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken() || '',
  userInfo: {}

}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  clearToken(state) {
    state.token = ''
    removeToken()
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  clearUserInfo(state) {
    state.userInfo = {}
  }
}

const getters = {

}

// 异步操作
const actions = {
  // login(context, data) {
  //   return new Promise((resolve, reject) => {
  //     loginApi(data).then((res) => {
  //       const token = res.data
  //       context.commit('setToken', token)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  async login({ commit }, data) {
    const res = await loginApi(data)
    commit('setToken', res.data)
    return res
  },
  // getUserInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfoApi().then(res => {
  //       const { data } = res
  //       commit('setUserInfo', data)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }

  async getUserInfo({ commit }) {
    const { data } = await getUserInfoApi()
    const { data: data2 } = await getBaseUserInfoApi(data.userId)
    data2.staffPhoto = 'https://img2.baidu.com/it/u=1297740018,2772695612&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1703264400&t=4717e85c23adcca8da479e9efcf3760b'
    const baseData = {
      ...data,
      ...data2
    }
    commit('setUserInfo', baseData)
    return baseData
  },
  // 注意：在真实的开发场景中，退出是要调用后端接口，同步前后端的token信息
  logout({ commit }) {
    // 清除token
    commit('clearToken')
    // 清除用户信息
    commit('clearUserInfo')
    // 清除router里面的路由表
    resetRouter()
    // 清除vuex路由表
    commit('permission/setRoutes', [], { root: true })
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
