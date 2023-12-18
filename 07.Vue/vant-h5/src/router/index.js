import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import Layout from '@/views/Layout'

import Like from '@/views/Layout/Like'
import Article from '@/views/Layout/Article'
import Collect from '@/views/Layout/Collect'
import User from '@/views/Layout/User'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/detail:id',
    component: Detail,
    name: 'detail'
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/article'
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/like',
        component: Like
      },
      {
        path: '/collect',
        component: Collect
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  {
    path: '/',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫：从哪儿来到哪儿去的信息
router.beforeEach((to, from, next) => {
  // to：到哪儿去
  // from：从哪儿来
  const token = localStorage.getItem('h5-token')
  if (token) {
    next() // 能放行！
  } else {
    // 没有登陆
    // 去的路由地址是不是 让去
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
