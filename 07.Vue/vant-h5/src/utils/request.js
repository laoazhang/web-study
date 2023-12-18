// 需求：需要大部分组建内部都需要axios
//    1、常规：每个组件倒入axios;
//    2、另外：未来开发中常用写法 原型对象上
//            所有vue实例化对象都能使用$axios功能
//            所有vue实例化：体现就是所有vue自己造组件
/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'

axios.defaults.baseURL = 'http://interview-api-t.itheima.net/h5/'
axios.defaults.timeout = 5000 // 超时5000ms

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 配置全局token信息
  config.headers.Authorization = localStorage.getItem('h5-token')
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 防止后台还有其他情况的401状态
  if (error.response.data.code === 401 && error.response.data.message === 'token错误，请联系管理员') {
    localStorage.removeItem('h5-token')
    // 路由跳转登陆路由
    // location.href='#/login'  无形中换了路由，代码维护不方便
    // 路由跳转
    router.push({ path: '/login' })
  } else {
    // 响应错误状态码 当前这个函数就会执行
    Toast.fail(error.response.data.message)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
