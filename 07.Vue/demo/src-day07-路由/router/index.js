// 注意：
//   1、当前js文件，需要Vue,导入！
//   2、main.js 用router，需要导出！
//   3、找某个地址地址：@


// **********************************************路由配置
// 0: npm i vue-router@3.5.3

// 1、导入router
import Vue from 'vue' // 导入vue框架
import VueRouter from 'vue-router'

// 2使用
Vue.use(VueRouter)


// 3、创建路由对象：配置对应关系
//   @：vue项目特有！@：从src文件夹地址！@/
import Find from '@/views/Find'
import My from '@/views/My'
import Friend from '@/views/Friend'
import Page404 from '@/views/404'
const router = new VueRouter({
  // 1、自己配置规则：
  // 2、展示组件有个展示地方：<router-view></router-view>  App.vue
  routes: [
    // 默认/ ---->指定来到某个下面已经配置好路由地址！
    {
      path: '/',
      redirect: "/find", // redirect:重新去哪
    },
    {
      name: "a", // 别名随便起，不是路径，就是名字,没有很多要求
      path: '/find', // path：路径去/find，注意配置没有#，用户点击a href="#/find"
      component: Find, // component组件：展示下面组件！
    },
    {
      name: "b",
      path: '/my',
      component: My,
    },
    {
      name: "c",
      path: '/friend',
      component: Friend,
    },
    // 可变路由规则：
    {
      name: "d",
      path: '/friend/:name',
      component: Friend,
    },
    // 
    {
      path: "*",
      component: Page404,
    }





  ],

  // 模式配置：看产品要求，需要后台配合！
  // mode: "history",  // history浏览器历史记录 默认hash;

});

// 导出：
export default router;