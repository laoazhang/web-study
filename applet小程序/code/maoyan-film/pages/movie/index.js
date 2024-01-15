

Page({
  data: {
    // 1. 页签数据
    tabs: [
      { 
        name: '热映',
        type: 'hot'
      },
      {
        name: '待映',
        type: 'plan'
      }
    ],
    // 2. 选中的页签
    active: 'hot',
    // 列表数据
    list: []
  },
  // == 不要写成箭头函数 ==
  test: () => {
    // vue在methods中定义的方法写成箭头函数，也无法获取this
    console.log('是否可以获取this?', this)
  },
  // 页面加载时钩子函数
  onLoad() {
    this.test()
    console.log('获取this- success外边：', this)
    wx.request({
      url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
      data: {
        limit: 10,
        offset: 0,
        ct: '北京'
      },
      success: (res) => {
        console.log('获取this:', this)
        const {
          statusCode,
          data
        } = res;
        if (statusCode === 200) {
          const list = data.data.hot;
          console.log('电影列表：', list)
          // 处理图片=>目前不需要处理
          // list.forEach((item) => {
          //   item.img = item.img.replace('w.h', '128.180')
          // })
          this.setData({
            list
          })
        }

      }
    })
  },
  // 点击切换页签
  /**
   * 
   * @param {*} e 事件对象
   */
  changeTab(e) {
    console.log(e.target.dataset)
    this.setData({
      active: e.target.dataset.type
    })
  }

});