// house_pkg/pages/locate/index.ts
import QQMapWX from '../../../libs/qqmap-wx-jssdk'

// 创建QQMap实例
const qqmapsdk = new QQMapWX({
  key: 'U5KBZ-RRM6N-P64FI-S5J55-AE72K-KMBQ2',
});

Page({
  data: {
    list: [],
    address: ''
  },
  async onLoad() {
    // 获取当前位置
    const { latitude, longitude } = await wx.getLocation({ type: 'gcj02' })
    this.search({ latitude, longitude })
    this.getPoint({ latitude, longitude })
  },
  // 打开地图选择位置
  async chooseLocation() {
    const { name, latitude, longitude } = await wx.chooseLocation()
    this.setData({
      address: name
    })
    this.search({ latitude, longitude })
  },
  // 获取当前位置文本
  getPoint({ longitude, latitude }) {
    qqmapsdk.reverseGeocoder({
      // 位置坐标
      location: { longitude, latitude },
      success: (res) => {
        // console.log('逆地址解析', res);
        this.setData({
          address: res.result.address
        })
      }
    })
  },
  // 搜索
  search({ longitude, latitude }) {
    console.log(longitude, latitude);
    // 调用搜索API
    qqmapsdk.search({
      // 位置坐标
      location: { longitude, latitude },
      keyword: '住宅小区',
      page_size: 5,
      success: (res) => {
        console.log(res);
        this.setData({ list: res.data })
      }
    })
  }
})