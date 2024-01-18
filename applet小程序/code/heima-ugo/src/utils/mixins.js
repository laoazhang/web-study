/**
 * vue全局混入
 */

export default {
  data() {
    return {
      test: 1000,
    }
  },
  methods: {
    checkAuth() {
      const token = uni.getStorageSync('ugo-token')
      if (!token) {
        // 没有token跳回登录页
        uni.navigateTo({
          url: '/packone/auth/index',
        })
      }
    },
  },
}
