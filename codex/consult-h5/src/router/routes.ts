/**
 * 配置路由规则
 * @returns
 */
// import Test from '@/views/test/index.vue'
const Test = () => import('@/views/test/index.vue')

// 路由配置数组
const routes = [
  // 一级路由 => router-view挂载点放到App.vue根组件
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    // 路由元信息作用：给路由添加数据
    meta: {
      title: '登录'
    }
  },
  //测试页面
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      title: '测试'
    }
  },
  // tabBar页面
  {
    // 父路由：layout公共布局页面
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      // 二级路由：挂载点放到父路由指定位置
      // 子路由：首页、健康百科、消息中心、我的个人中心
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '健康百科'
        }
      },
      {
        path: '/notify',
        component: () => import('@/views/notify/index.vue'),
        meta: {
          title: '消息中心'
        }
      },
      {
        path: '/user',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  // 家庭档案
  {
    path: '/user/patient',
    component: () => import('@/views/user/PatientInfo.vue'),
    meta: { title: '家庭档案' }
  }
]

export default routes
