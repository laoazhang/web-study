import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} data 登录所需参数
 * @returns
 */
export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户基本信息
 * @param {*} id 用户ID
 * @returns
 */
export const getBaseUserInfoApi = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
