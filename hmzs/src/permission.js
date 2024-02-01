// 权限控制
import router from './router'
import store from './store'
import { getToken } from './utils/auth'

// 导入原始动态路由表
import { asyncRoutes } from './router/asyncRoutes'

// 白名单
const WHITE_LIST = ['/login', '/404']

// 处理一级路由权限数据
function getFirstRoutePerms(permsArr) {
  const newArr = permsArr.map(item => {
    return item.split(':')[0]
  })
  return [...new Set(newArr)]
}

// 处理二级路由权限数据
function getSecondRoutePerms(permsArr) {
  const newArr = permsArr.map(item => {
    const arr = item.split(':')
    return `${arr[0]}:${arr[1]}`
  })
  return [...new Set(newArr)]
}

// 根据权限标识过滤路由表
function getRoutes(firstRoutePerms, secondRoutePerms, asyncRoutes) {
  console.log(firstRoutePerms)
  if (firstRoutePerms.includes('*')) {
    // 管理员
    return asyncRoutes
  }
  // 根据一级和二级对动态路由表做过滤 return出去过滤之后的路由表
  // 1. 根据一级路由对动态路由表做过滤
  return asyncRoutes.filter(route => {
    return firstRoutePerms.includes(route.permission)
  }).map(item => {
    // 2. 对二级路由做过滤
    return {
      ...item,
      children: item.children.filter(item => secondRoutePerms.includes(item.permission))
    }
  })
}

router.beforeEach(async(to, from, next) => {
  const token = getToken()
  // 有token
  if (token) {
    next()
    if (!store.state.user.profile.id) {
      // 1. 调用action函数获取用户权限数据
      const perms = await store.dispatch('user/getProfile')
      // 2. 把后端的权限数组格式化成我们自己的俩个权限数据
      console.log('当前的权限数据为:', perms)
      const firstRoutePerms = getFirstRoutePerms(perms)
      console.log(firstRoutePerms)
      const secondRoutePerms = getSecondRoutePerms(perms)
      console.log(secondRoutePerms)
      // 3. 根据权限标识 过滤筛选 动态路由表 最终得到有资格显示到左侧的所有路由表
      const routes = getRoutes(firstRoutePerms, secondRoutePerms, asyncRoutes)
      console.log('最终路由表', routes)
      // 4. 把动态路由表加入到路由系统中（当浏览器中访问路由的路径 显示渲染出来对应的组件）

      routes.forEach(route => {
        router.addRoute(route)
      })
      // 5. 调用mutation函数把路由表存入vuex
      store.commit('menu/setMenulist', routes)
    }
  } else {
    // 没有token
    if (WHITE_LIST.includes(to.path)) {
      // 放行
      next()
    } else {
      // 跳转登录页面
      next('/login')
    }
  }
})
