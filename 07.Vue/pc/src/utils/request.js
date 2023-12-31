/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://interview-api-t.itheima.net/'
axios.defaults.timeout = 5000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 携带token
  config.headers.Authorization = store.state.user.token
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
}, error => {
  // 对响应错误做点什么
  if (error.response.data.code === 401) {
    // token 过期
    // 1、删除 vuex内token(不能直接操作本地localStorage)
    store.commit('user/del')
    // 2、路由跳转 /login
    // router.push({path: '/login'})
    router.push('/login')
  } else { // 除了401外，所有报错都进行提醒
    Message({
      showClose: true,
      message: error.response.data.message,
      type: 'error'
    })
  }
  return Promise.reject(error)
})

export default axios
