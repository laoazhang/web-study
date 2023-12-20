import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Dashboard from '@/views/layout/dashboard'
import Article from '@/views/layout/article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // token：
  //      1、常规思考：直接使用localstorage
  //      2、为了代码使用统一性，localstorage被vuex操作，这块获取token也是通过vuex！
  // store   不是this.$store, 不是组件! 需要导入store模块
  const token = store.state.user.token
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
