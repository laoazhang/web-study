// pages/profile/index.ts
const pageStack = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 获取实例
    const app = getApp()
    // 将头像和昵称渲染到页面中
    this.setData({ ...app.userProfile })
  },
  // 获取用户昵称
  getUserNickName(ev) {
    // 更新昵称
    this.updateNickName(ev.detail.value)
  },
  // 更新用户昵称
  async updateNickName(nickName) {
    if (nickName === '') return
    // 调用接口更新用户昵称
    const { code } = await wx.http.put('/userInfo', { nickName })
    if (code !== 10000) return wx.utils.toast('更新昵称失败！')
    // 借助于页面栈实例来更新 pages/my/index.wxml 中的昵称
    pageStack[0].setData({ nickName })
    // 同步数据到应用实例中
    const app = getApp()
    app.userProfile.nickName = nickName
  },
  // 获取用户头像
  getUserAvatar(ev) {
    // 更新用户头像
    this.updateAvatar(ev)
  },
  // 更新用户头像
  async updateAvatar(ev) {
    // 调用API上传文件
    // wx.uploadFile({
    //   // 接口地址
    //   url: wx.http.baseURL + "/upload",
    //   // 待上传的文件路径
    //   filePath: avatar,
    //   name: 'file',
    //   header: {
    //     // 用户登录状态
    //     Authorization: 'Bearer ' + getApp().token,
    //   },
    //   formData: { type: 'avatar' },
    //   success: (result) => {
    //     // 待处理返回的数据
    //     const data = JSON.parse(result.data)
    //     // 检测接口是否调用成功
    //     if (data.code !== 10000) return wx.utils.toast('上传头像失败！')
    //     // 借助于页面栈实例来更新 pages/my/index.wxml 中的头像
    //     pageStack[0].setData({ avatar: data.data.url })
    //     this.setData({ avatar: data.data.url })
    //     // 同步更新数据到应用实例中
    //     const app = getApp()
    //     app.userProfile.avatar = data.data.url
    //   }
    // })
    const { code, data } = await wx.http.upload('/upload', {
      name: 'file',
      filePath: ev.detail.avatarUrl,
      formData: {
        type: 'avatar',
      }
    })
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('上传头像失败！')
    // 借助于页面栈实例来更新 pages/my/index.wxml 中的头像
    pageStack[0].setData({ avatar: data.url })
    this.setData({ avatar: data.url })
    // 同步更新数据到应用实例中
    const app = getApp()
    app.userProfile.avatar = data.url
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})