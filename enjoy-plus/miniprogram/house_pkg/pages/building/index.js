// house_pkg/pages/building/index.ts
Page({

  data: {
    size: 0,
    point: '',
    type: ''

  },

  onLoad({ point }) {
    // 生成假数据
    this.fake(point)
  },
  fake(point) {
    // 生成漏洞数
    const size = Math.floor(Math.random() * 4) + 3
    // 楼栋名称(xx小区/xx栋)
    const type = size > 4 ? '号楼' : '栋'
    // 数据渲染
    this.setData({ size, type, point })
  }
})