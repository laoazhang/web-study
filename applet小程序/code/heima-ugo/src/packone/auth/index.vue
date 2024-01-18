<template>
  <view>
    <button @click="login" type="primary">微信登录</button>
  </view>
</template>

<script>
export default {
  methods: {
    onLoad() {
      this.getCode()
    },
    async getCode() {
      // 1. 获取微信用户登录凭证
      const { errMsg, code } = await uni.login()
      if (errMsg === 'login:ok') {
        this.code = code
        console.log('微信用户登录凭证', errMsg, code)
      }
    },
    // 登录
    async login() {
      /**
       * 微信登陆流程：
       * 1. 页面加载后，首先调用uni.login方法，获取微信用户登陆凭证
       * 2. 调用uni.getUserProfile方法，获取微信用户信息
       * 3. 调用后台api登录接口，传入获取微信用户信息进行登录
       * 4. 登录成功后获取token，持久化到本地
       */
      // 2. 获取微信用户信息成功
      const { errMsg, encryptedData, rawData, iv, signature } =
        await uni.getUserProfile({ desc: '获取微信用户信息登录' })
      if (errMsg === 'getUserProfile:ok') {
        // 3. 调用后台接口登录
        const { msg, data } = await this.request({
          url: '/api/public/v1/users/wxlogin',
          method: 'post',
          data: {
            encryptedData,
            rawData,
            iv,
            signature,
            code: this.code,
          },
        })
        console.log('登录', msg, data)
        if (msg.status === 200) {
          uni.setStorageSync('ugo-token', data.token)
          uni.navigateBack()
        } else {
          uni.showToast({
            title: '登录失败！',
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  width: 600rpx;
  margin: 200rpx auto 0;
}
</style>
