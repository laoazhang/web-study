// app.js
import utils from './utils/utils'

// 导入 uitls/http.js
import http from './utils/http.js'

// 注册到全局 wx 对象上
wx.utils = utils

// 挂载到全局对象
wx.http = http

App({
  // 全局数据，存放token，方便其他地方获取
  token: wx.getStorageSync('token'),
  refreshToken: wx.getStorageSync('refreshToken'),
  globalData: {},
  // onLaunch() {
  //   // 获取token
  //   this.token = wx.getStorageSync('token')
  // },
  setToken(key, token) {
    // 保存token到全局App
    this[key] = token
    // 保存token到本地缓存
    wx.setStorageSync(key, token)
  }
})
