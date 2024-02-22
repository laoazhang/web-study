// 导入 http 模块
import http from 'wechat-http'
// 基础路径，同时需添加合法请求域名
http.baseURL = 'https://live-api.itheima.net'

// 响应拦截器，返回核心数据 data
http.intercept.response = (res) => {
  return res.data
}

// 普通的模块导出
export default http