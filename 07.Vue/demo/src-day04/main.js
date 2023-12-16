import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App

import cpt2 from "./components/02-cpt"; // 全局导入
Vue.component("cpt2", cpt2);

import cpt3 from "./components/03-cpt"; // 全局导入
Vue.component(cpt3.name, cpt3); // 名字内部已经定义好！


Vue.config.productionTip = false

new Vue({
    render: h => h(App), // render:渲染 App.vue组件
  }).$mount('#app') //  mount：挂载  #app?index页面内标签！

// 说明：导入哪个组件就显示哪个组件！