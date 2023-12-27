import router from './router'
import store from './store'
// 导入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { asyncRoutes } from '@/router'
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
        store.dispatch('user/getUserInfo').then(async(res) => {
          // 1.在这里可以拿到用户的权限
          // 2.拿到权限之后 可以动态新增路由
          // addRoutes 可以在router对象上新增路由
          // this.$router.options.routes 只能取 创建VueRouter实例的时候传过去的路由
          // 动态添加的路由this.$router.options.routes 是取不到的(不是一个响应式)
          // addRoutes 是一个异步的 不会阻碍后面代码的执行
          // menu里存的是用户对应的页面权限
          const { roles: { menus }} = res
          // console.log('有权限的路由', otherRoutes)
          // console.log('全部路由', asyncRoutes)
          const otherRoutes = await store.dispatch('permission/filterRoutes', menus)
          // 必须把筛选后的动态路由 添加到router的路由表中
          router.addRoutes(
            [
              ...otherRoutes,
              { path: '*', redirect: '/404', hidden: true }
            ])
          // 为了让用户看到对应的导航  就让用户重新再进一次页面
          next({
            ...to,
            replace: true
          })
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
