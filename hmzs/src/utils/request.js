import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
import router from '../router'
import store from '../store'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    // 请求头携带token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.dir(error.response.status)
    // Token 401处理
    if (error.response.status === '401') {
      // 1. 跳转到登录
      router.push('/')
      // 2. 清除token
      store.commit('user/clearUserInfo')
    } else {
      // 错误统一处理
      Message.error(error.response.data.msg)
    }

    return Promise.reject(error)
  }
)

export default service
