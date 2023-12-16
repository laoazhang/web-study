// 1、导入router
import Vue from 'vue' // 导入vue框架
import VueRouter from 'vue-router'

// 2使用
Vue.use(VueRouter)

import Layout from "@/views/Layout" // 一级路由组件
import Article from "@/views/Layout/Article" // 二级路由组件
import Collect from "@/views/Layout/Collect" // 二级路由组件
import Like from "@/views/Layout/Like" // 二级路由组件
import User from "@/views/Layout/User" // 二级路由组件

import ArticleDetail from "@/views/ArticleDetail" // 一级路由组件

const router = new VueRouter({
  // 1、路由规则！2、路由出口 router-view
  routes: [
    // 直接配置这些路由规则，第一次/xxxx 一级路由
    {
      path: '/',
      component: Layout,
      children: [
        // 
        { // 二级路由规则配置，也是路径地址和对应的组件
          path: "/article",
          component: Article,
        },
        {
          path: "/collect",
          component: Collect,
        },
        {
          path: "/like",
          component: Like,
        },
        {
          path: "/user",
          component: User,
        }
      ]
    },

    // 文章详情：
    {
      name: "detail",
      path: '/detail/:id',
      component: ArticleDetail
    }


  ]
});

// 导出：
export default router;