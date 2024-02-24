// 获取应用实例
const app = getApp()
Page({
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onLoad() {
    // 用户未登录时不必请求
    app.token && this.getUserProfile()
  },
  async getUserProfile() {
    // 调用接口获取昵称和头像
    const { code, data: { avatar, nickName } } = await wx.http.get('/userInfo')
    if (code !== 10000) return wx.utils.toast()
    // 渲染数据
    this.setData({ avatar, nickName })
    // 将头像和昵称存储到应用实例中
    app.userProfile = { avatar, nickName }
  },
})
