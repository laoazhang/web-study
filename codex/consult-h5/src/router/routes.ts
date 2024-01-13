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
    redirect: '/home',
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
  },
  // 问诊级别
  {
    path: '/consult/fast',
    component: () => import('@/views/consult/ConsultFast.vue'),
    meta: { title: '极速问诊' }
  },
  // 选择科室
  {
    path: '/consult/dep',
    component: () => import('@/views/consult/ConsultDep.vue'),
    meta: { title: '选择科室' }
  },
  // 病情描述
  {
    path: '/consult/illness',
    component: () => import('@/views/consult/ConsultIllness.vue'),
    meta: { title: '病情描述' }
  },
  // 支付页面
  {
    path: '/consult/pay',
    component: () => import('@/views/consult/ConsultPay.vue'),
    meta: { title: '问诊支付' }
  },
  // 问诊室
  {
    path: '/room',
    component: () => import('@/views/room/index.vue'),
    meta: { title: '问诊室' }
  },
  // 问诊订单
  {
    path: '/user/consult',
    component: () => import('@/views/user/ConsultOrder.vue'),
    meta: { title: '问诊记录' }
  },
  // 问诊详情
  {
    path: '/user/consult/:id',
    component: () => import('@/views/user/ConsultDetail.vue'),
    meta: { title: '问诊详情' }
  },
  // 支付结果
  {
    path: '/medicine/pay/result',
    component: () => import('@/views/medicine/OrderPayResult.vue'),
    meta: { title: '药品支付结果' }
  },
  // 药品支付
  {
    path: '/medicine/pay',
    component: () => import('@/views/medicine/OrderPay.vue'),
    meta: { title: '药品支付' }
  },
  // 药品订单详情
  {
    path: '/medicine/:id',
    component: () => import('@/views/medicine/OrderDetail.vue'),
    meta: { title: '药品订单详情' }
  },
  // 药品发货后：物流详情
  {
    path: '/medicine/express/:id',
    component: () => import('@/views/medicine/OrderExpress.vue'),
    meta: { title: '物流详情' }
  }
]

export default routes
