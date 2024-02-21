// app.js
import utils from './utils/utils'

// 导入 uitls/http.js
import http from './utils/http.js'

// 注册到全局 wx 对象上
wx.utils = utils

// 挂载到全局对象
wx.http = http

App({
  globalData: {},
})
