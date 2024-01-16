/**
 * 需求：基于uni.request()封装网络请求方法
 * 1. 支持设置BASE_URL=>后台请求基础地址
 * 2. 支持统一添加loading、token,简化数据返回
 * 要求：封装异步函数，接收{ url, method, data }参数，返回结果：msg和data
 */
const BASE_URL = 'https://api-hmugo-web.itheima.net'
const request = async ({ url, method, header = {}, data }) => {
  /**
   * 封装思路：
   * 1. 发送请求之前：显示loading，统一添加token
   * 2. 请求中：== 使用uni.request()执行请求发送 ==
   * 3. 发请求之后：判断请求是否成功？
   *    1. 如果成功，返回后台数据
   *    2. 如果失败，抛出promise错误
   */
  uni.showLoading({
    title: '请求中...',
    mask: true, // 避免没有数据时候，用户点击页面中元素
  })
  // 从本地获取token
  // 说明：未来登录成功后，本地会存储：名为'ugo-token-150'token值
  const token = uni.getStorageSync('ugo-token-150')
  if (token) {
    header.Authorization = token
  }

  const res = await uni.request({
    url: BASE_URL + url, // 拼接后台请求完整地址
    method,
    header,
    data,
  })

  // 请求成功或失败都关闭loading
  uni.hideLoading()

  if (res.statusCode == '200') {
    // 1. 请求成功，返回数据
    return {
      msg: res.data.meta,
      data: res.data.message,
      res: res,
    }
  } else {
    // 2. 请求失败，抛出Promise错误
    return Promise.reject(error)
  }
}

export default request
