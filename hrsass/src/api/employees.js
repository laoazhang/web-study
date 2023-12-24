import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns
 */
export const getSimpleUserListApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 * @param {*} page 当前页
 * @param {*} size 页容量
 * @returns
 */
export const getEmployeeListApi = (page, size) => {
  return request({
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}
