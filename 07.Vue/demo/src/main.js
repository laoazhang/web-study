import Vue from 'vue' //导入vue框架
import App from './App.vue' // 导入 组件App
import store from '@/store'

Vue.config.productionTip = false

//关联路由对象和vue实例 data methods
new Vue({
        store,
        render: h => h(App), // render：渲染 App.vue组件
    }).$mount('#app') // mount: 挂载 #app? index页面内标签!