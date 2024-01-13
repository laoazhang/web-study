import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'

// vant需要单独引入的样式
import 'vant/lib/index.css'

// 导入全局样式
import '@/styles/index.scss'

// 注册图标
import 'virtual:svg-icons-register'

// 1. 创建vue根实例
const app = createApp(App)

// 2. 注册pinia和router
app.use(pinia)
app.use(router)

console.log('读取环境变量:', import.meta.env)

// 3. 挂载渲染App根组件
app.mount('#app')
