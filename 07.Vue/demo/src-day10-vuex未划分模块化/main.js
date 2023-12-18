import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App
import store from "./store"

Vue.config.productionTip = false



new Vue({
  // 4、与App.vue实例关联在一起
  store,
  render: h => h(App),
}).$mount('#app')




// 开发模式选择：
//    1、ESlint：标准化！开发所谓项目的时候！
//           1、eslint插件
//           2、配置多了两个
//           3、把以前格式化插件禁用！
//           4、项目打开方式只能项目目录为根目录


//    2、Demo：学习 反着来
//           1、eslint插件禁用！需要重新加载！
//           2、注释两个配置，不要删除！注意配置项最后键值对末尾逗号删除！
//           3、再次开启格式化插件！
//           4、只打开src！
//           5、vue.config.js     lintOnSave: false关闭！