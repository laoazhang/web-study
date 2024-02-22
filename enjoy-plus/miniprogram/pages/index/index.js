Page({
  onLoad() {
    this.getNotices()
  },
  // 获取公告列表
  async getNotices() {
    const { code, data: notices } = await wx.http({
      url: '/announcement',
      method: 'GET'
    })
    console.log('公告列表数据', code, notices);
    // 更新页面数据
    this.setData({ notices })
  },
})
