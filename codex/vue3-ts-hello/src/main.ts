import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
// import App from './views/data变量定义/index.vue'
// import App from './views/组件通信/index.vue'
// import App from './views/事件处理/index.vue'
import App from './views/黑马头条案例/index.vue'
// import App from './views/pinia使用/index.vue'

// 1.导入创建pinia的方法
import { createPinia } from 'pinia'

// 2.创建pinia实例
const pinia = createPinia()

// 3.注册pinia
createApp(App).use(pinia).mount('#app')
