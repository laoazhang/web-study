// 放置全局指令
import Vue from 'vue'
import store from '@/store'
// 管理员权限特殊处理
const adminPerms = '*:*:*'
Vue.directive('auth-btn', {
  inserted(el, data) {
    console.log(el, data.value)
    const perms = store.state.user.profile.permissions
    if (!perms.includes(data.value) && !perms.includes(adminPerms)) {
      el.remove()
    }
  }
})
