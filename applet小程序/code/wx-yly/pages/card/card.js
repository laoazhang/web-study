// pages/card/card.js
Page({
  /**
   * 小程序的页面在跳转路由后，被销毁了吗？ => 没有
   * vue的页面在跳转路由后，被销毁了吗？ => 没有
   * 如果想缓存vue组件？ => <keep-alive include="name1,name2"> 要缓存的组件 </keep-alive>
   */
// 1. 前边3个在页面第一次加载的时候会执行一次
// 页面加载时 vue=>created
onLoad: function () {
  // 只会触发1次 => 发送请求，获取后台数据
  console.log('当前页面被加载了...');
  console.log('wx提供的api：', wx);
  wx.request({
    url: 'http://5990367be1e4470011c46fa8.mockapi.io/meng/user', 
    success (res) {
      console.log(res)
    },
    fail(){

    }
  })
},
useApi(){
  // wx.showToast({
  //   title: '消息提示',
  //   icon: 'error',
  //   duration: 2000
  // })
  // wx.showModal({
  //   title: '提示',
  //   content: '这是一个模态弹窗',
  //   success (res) {
  //     if (res.confirm) {
  //       console.log('用户点击确定')
  //       wx.hideTabBar({
  //         animation:true
  //       })
  //     } else if (res.cancel) {
  //       wx.showTabBar({
  //         animation:true
  //       })
  //       console.log('用户点击取消')
  //     }
  //   }
  // })

  // 跳转
  wx.navigateTo({
    url: '/pages/test/test',
  })
  wx.setStorage({
    key:'test',
    data:[1,2,3]
  },{
    key:'demo',
    data:true
  })


},

// 页面显示时（返回、tabBar切换、前台运行）
onShow: function () {
  // 重复触发
  console.log('当前页面显示了...');
},
// vue=> mounted
onReady: function () {
  // 只会触发1次
  console.log('当前页面初次渲染完毕了...');
},

// 页面隐藏时（跳转、tabBar切换、后台运行）
onHide: function () {
  console.log('当前页面不见了...');
}
})