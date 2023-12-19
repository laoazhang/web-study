import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default router
