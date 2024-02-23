// 安装依赖 npm install wechat-validate
// 工具-构建 npm

// 在页面或组件中导入
import validate from 'wechat-validate'

Page({
  // 通过 behaviors 注入 validate 方法，相当于 Vue 的 mixins
  behaviors: [validate],
  data: {
    countDownVisible: false,
    mobile: '',
    code: ''
  },
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' },
    ],
    code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
    ]
  },

  // bing:change 倒计时变化时
  countDownChange(ev) {
    // console.log('倒计时', ev);
    this.setData({
      // 倒计时组件数据
      timeData: ev.detail,
      // 是否显示倒计时组件
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  //获取验证码
  async getSMSCode() {
    // 验证通过后发送请求
    const { valid, message } = this.validate('mobile')
    if (valid) {
      this.setData({
        countDownVisible: true
      })
      console.log('手机号', this.data.mobile);
      const { data: { code } } = await wx.http.get('/code', { mobile: this.data.mobile })
      console.log('验证码', code);
      this.setData({
        code: code
      })
    } else {
      wx.utils.toast(message)
    }
  },
  onLoad({ redirectURL }) {
    // 获取地址参数
    this.redirectURL = redirectURL
  },
  // 登录表单提交
  async onSubmit() {
    // 验证码 rules 中定义的全部数据
    const isAllValid = this.validate()
    if (isAllValid) {
      const { mobile, code } = this.data
      const res = await wx.http.post('/login', { mobile, code })
      console.log('登录状态', res);
      // 验证是否登录成功
      if (res.code !== 10000) return wx.utils.toast('登录失败，稍后重试!')
      const app = getApp()
      // 保存token
      app.setToken('token', res.data.token)
      app.setToken('refreshToken', res.data.refreshToken)
      // 重定向
      wx.redirectTo({ url: this.redirectURL })
    } else {
      return
    }
  }
})
