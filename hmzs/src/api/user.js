import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */
export function loginAPI({ username, password }) {
  return request({
    url: '/park/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
