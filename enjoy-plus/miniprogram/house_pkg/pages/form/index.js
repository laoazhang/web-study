// \u4e00-\u9fa5] 中文验证规则
// 在页面或组件中导入
import validate from 'wechat-validate'
Page({
  // 通过 behaviors 注入 validate 方法
  behaviors: [validate],
  // 定义表单数据的验证规则
  rules: {
    name: [
      { required: true, message: '请填写业主姓名!' },
      { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '请检查业主姓名是否正确!' },
    ],
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1\d{10}$/, message: '请检查手机号码是否正确!' },
    ],
    idcardFrontUrl: [
      { required: true, message: '请上传身份证人像面!' },
    ],
    idcardBackUrl: [
      { required: true, message: '请上传身份证国徽面!' },
    ]
  },
  data: {
    id: '',
    point: '',
    building: '',
    room: '',
    name: '',
    mobile: '',
    gender: 1,
    idcardFrontUrl: '',
    idcardBackUrl: '',
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const { type } = ev.mark
    this.setData({ [type]: '' })
  },
  onLoad({ point, building, room, id }) {
    // 根据id 判断是否为修改房屋
    if (id) return this.getHouseDetail(id)
    this.setData({ point, building, room })
  },
  // 获取房屋详情接口
  async getHouseDetail(id) {
    const { code, data: houseDetail } = await wx.http.get('/room/' + id)
    if (code !== 10000) return wx.utils.toast('获取房屋详情失败!')
    this.setData({ ...houseDetail })
  },
  /**
   * 身份证照片上传
   * @param {*} ev 
   */
  async uploadPicture(ev) {
    // 区分用户上传的是正面或反面
    const { type } = ev.mark
    try {
      // 打开相册或拍照
      const { tempFiles } = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed']
      })
      if (tempFiles[0].size > 1 * 1024 * 1024) {
        return wx.utils.toast('图片大小不能超过1M')
      }
      // 调用API上传图片
      const { code, data } = await wx.http.upload('/upload', {
        name: 'file',
        filePath: tempFiles[0].tempFilePath,
      })
      // console.log('上传图片', data);
      if (!code === 10000) return wx.utils.toast('上传图片失败!')
      // 渲染数据
      this.setData({ [type]: data.url })
    } catch (err) {
      // 获取图片失败
      console.log(err);
    }
  },
  // 提交审核
  async onSubmit() {
    // 校验所有 rules 中定义的全部数据
    const isAllValid = this.validate()
    if (!isAllValid) return
    // eslint-disable-next-line no-unused-vars
    const { __webviewId__, ...body } = this.data
    if (this.data.id) {
      delete body.status
    } else {
      delete body.id
    }
    const { code } = await wx.http.post('/room', body)
    if (!code === 10000) return wx.utils.toast('提交失败!')
    // 后退回列表页，后退四级，中间的页面都要销毁
    wx.navigateBack({ delta: this.data.id ? 2 : 4 })
  },
})
