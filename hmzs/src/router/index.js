import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/enterpriseAdd',
    component: () => import('@/views/Park/Enterprise/addEnterprise')
  },
  {
    path: '/exterpriseDetail',
    component: () => import('@/views/Park/Enterprise/EnterpriseDetail')
  },
  {
    path: '/cardAdd',
    component: () => import('@/views/Car/CarCard/addMounthCard')
  },
  {
    path: '/roleAdd',
    component: () => import('@/views/System/Role/AddRole')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench'
  },
  // 只有一级路由
  // 一级路由：负责把layout架子渲染出来
  // 二级路由：path为空 会作为默认的二级路由一上来就渲染出来
  {
    path: '/workbench',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/Workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...routes]
})

const router = createRouter()

// 重置路由方法
export function resetRouter() {
  // 得到一个全新的router实例对象
  const newRouter = createRouter()
  // 使用新的路由记录覆盖掉老的路由记录
  router.matcher = newRouter.matcher
}

export default router
