// components/authorization/index.js
Component({

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },
  // 生命周期函数，自动执行方法
  lifetimes: {
    created() { },
    // attached 相当于 Vue 的 mounted
    attached() {
      // 获取登录凭证，判断用户是否已登录
      const isLogin = !!getApp().token
      // 变更登录状态
      this.setData({ isLogin })
      // 如果未登录，跳转到登录页
      if (isLogin === false) {
        // 保留当前页面，跳转到应用内的某个页面
        // wx.navigateTo 相当于 Vue 的 this.$router.push()
        // wx.redirectTo 相当于 Vue 的 this.$route.replace()
        // 关闭当前页面，跳转到登录页 
        // 获取页面栈
        const pageStack = getCurrentPages()
        // 获取页面路径
        const currentPage = pageStack.pop()
        wx.redirectTo({
          url: '/pages/login/index?redirectURL=/' + currentPage.route,
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})