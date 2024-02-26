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
http.intercept.response = async (res) => {
  // 如果状态码为401 ，则表明 token已失效
  if (res.data.code === 401) {
    // 获取应用实例来读取refreshToken
    const app = getApp()
    // 1.3 状态为 401 且接口为 /refreshToken 表明 refreshToken 也过期了
    if (res.config.url.includes('/refreshToken')) {
      // 获取当前页面的路径，保证登录成功后能跳回到原来页面
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      const redirectURL = currentPage.route
      // 路由跳转（登录页面）
      return wx.redirectTo({
        url: '/pages/login/index?redirectURL=/' + redirectURL,
      })
    }
    // 1.1 调用接口获取新的 token
    const { code, data } = await http({
      url: '/refreshToken',
      method: 'POST',
      header: {
        Authorization: 'Bearer ' + app.refreshToken,
      }
    })
    // 检测接口是否调用成功
    if (code !== 10000 && res.config.url.includes('/refreshToken')) return wx.utils.toast('更新token失败')
    // 重新存储新的token
    app.setToken('token', data.token)
    app.setToken('refreshToken', data.refreshToken)

    // 1.2 获取到原来接口请求的参数
    res.config = Object.assign(res.config, {
      header: {
        // 更新后的token
        Authorization: 'Bearer ' + data.token,
      },
    })
    // 重新发送请求
    return http(res.config)
  }
  return res.data
}

// 普通的模块导出
export default http