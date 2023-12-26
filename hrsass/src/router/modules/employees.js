// 员工模块
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail'),
      meta: { title: '员工详情' },
      hidden: true
    },
    // 员工打印页
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '员工打印'
      }
    }
  ]
}
