import axios from 'axios'

// create an axios instance
const service = axios.create({
  // 当baseURL配置的基地址如果不是以http或https开头的话，则会把网站对应的域名拼接上
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default service
