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