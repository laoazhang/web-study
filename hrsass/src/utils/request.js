import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // 当baseURL配置的基地址如果不是以http或https开头的话，则会把网站对应的域名拼接上
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 对响应数据做点什么
  const res = response.data
  if (!res.success) {
    Message.error(res.message)
    return Promise.reject(new Error(res.message))
  }
  return res
}, error => {
  // 对响应错误做点什么
  const { response } = error
  if (response.status === 401 && response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
