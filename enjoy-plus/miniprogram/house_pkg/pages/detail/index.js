Page({
  data: {
    houseDetail: {},
  },
  onLoad({ id }) {
    // 获取房屋详情
    this.getHouseDetail(id)
  },
  // 获取房屋详情
  async getHouseDetail(id) {
    if (!id) return wx.utils.toast('参数有误!')
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    if (code !== 10000) return wx.utils.toast('获取房屋详情失败!')
    this.setData({ houseDetail })
  },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index',
    })
  },
})
