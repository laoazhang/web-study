import VueRouter from 'vue-router' // 导入 vue路由
import Vue from 'vue' //导入vue框架

import Layout from '@/views/Layout'
import Article from '@/views/Layout/Article'
import Collect from '@/views/Layout/Collect'
import Like from '@/views/Layout/Like'
import User from '@/views/Layout/User'
import ArticleDetail from '@/views/ArticleDetail'


Vue.use(VueRouter)

// 创建一个路由对象
const router = new VueRouter({
  routes:[
    {
        path:'/',
        component:Layout,
        children:[
            {
                path:"/article",
                component: Article,
            },
            {
                path:"/collect",
                component: Collect,
            },
            {
                path:"/like",
                component: Like,
            },
            {
                path:"/user",
                component: User,
            },
        ]
      },
      {
        name:"detail",
        path: '/detail/:id',
        component: ArticleDetail
      },
  ],
})

export default router
