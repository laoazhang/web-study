import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { showToast } from 'vant'

// 1. 新axios实例，基础配置
const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL,
  timeout: 1000
})

// // 2. 请求拦截器，携带token => 发请求之前
request.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 3. 响应拦截器，剥离无效数据，401拦截
request.interceptors.response.use(
  (res) => {
    // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
    if (res.data?.code !== 10000) {
      showToast(res.data?.message)
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      // 为什么携带出现401页面的地址？
      // router.currentRoute.value.fullPath 当前访问页面的path地址
      // 说明：vue3 => router.currentRoute.value是个ref变量，所以访问需要加value
      // 答：为了让用户重新登录后，跳转回上次访问页面 => 交互体验好
      // fullPath完整path地址, 会携带地址参数, 但是path不会
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

export { baseURL, request }
