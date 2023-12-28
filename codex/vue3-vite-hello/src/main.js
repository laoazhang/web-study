import { createApp } from 'vue'
// 全局样式
import './style.css'
// 根组件
// import App from './App.vue'
// 练习组件
// import App from './view/vue2vs3/index.vue'
// import App from './view/setup入口函数/index.vue'
// import App from './view/data变量定义/reactive函数.vue'
// import App from './view/data变量定义/ref函数.vue'
// import App from './view/data数据处理/computed函数.vue'
import App from './view/data数据处理/watch函数.vue'

/**
 * vue3使用：=》vue2通过new Vue()
 * 1. createApp(App) 创建根实例
 * 2. app根实例mount方法把根组件挂载渲染显示到index.html中div#app盒子中
 */
// createApp(App).mount('#app')
const app = createApp(App)
// app.use(ElementPlus)
app.mount('#app')
