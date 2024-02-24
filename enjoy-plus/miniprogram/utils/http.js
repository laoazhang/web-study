// 导入 http 模块
import http from 'wechat-http'
// 基础路径，同时需添加合法请求域名
http.baseURL = 'https://live-api.itheima.net'

// 请求拦截器
http.intercept.request = function (options) {
  // 扩展头信息
  const defaultHeader = {}

  // 身份认证
  defaultHeader.Authorization = 'Bearer ' + getApp().token

  // 与默认头信息合并
  options.header = Object.assign({}, defaultHeader, options.header)

  // 处理后的请求参数
  return options

}


// 响应拦截器，返回核心数据 data
http.intercept.response = (res) => {
  return res.data
}

// 普通的模块导出
export default http