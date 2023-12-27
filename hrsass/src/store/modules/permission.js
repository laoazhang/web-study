import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [...constantRoutes, ...otherRoutes,
    // 可加可不加。
      { path: '*', redirect: '/404', hidden: true }]
  }
}
const actions = {
  async filterRoutes({ commit }, menus) {
    // 一般对于vuex的操作，都写在store中
    const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    commit('setRoutes', otherRoutes)
    return otherRoutes
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
