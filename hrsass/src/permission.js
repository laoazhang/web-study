import router from './router'
import store from './store'
// 导入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']

// 路由守卫
// 只要发生页面跳转，都走beforeEach
// to: 去哪个页面
// from：从哪个页面过来
// next：正常跳转
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    // 有token的情况
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 获取用户信息
      if (Object.keys(store.state.user.userInfo).length <= 0) {
        store.dispatch('user/getUserInfo').then(() => {
          next()
        })
      } else {
        next()
      }
      NProgress.done()
    }
  } else {
    // 没有touken的情况
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
