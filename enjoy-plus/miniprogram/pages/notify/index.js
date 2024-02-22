// pages/notify/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }) {
    this.getNoticesDetail(id)
  },

  // 获取公告详情数据
  async getNoticesDetail(id) {
    // 检测id是否存在
    if (typeof id === undefined) return
    console.log('id', id);
    const { code, data: noticeDetail } = await wx.http.get('/announcement/' + id)
    console.log('公告详情数据', code, noticeDetail);
    //渲染数据
    this.setData({ noticeDetail })
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