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

/**
 * 删除员工
 * @param {*} id 员工id
 * @returns
 */
export const delEmployeeApi = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 添加员工接口
 * @param {*} from
 * @returns
 */
export const addEmployeeApi = from => {
  return request({
    url: '/sys/user',
    method: 'post',
    data: from
  })
}

/**
 * 批量导入员工数据
 * @param {*} list
 * @returns
 */
export const batchAddEmployeeApi = list => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: list
  })
}

/**
 * 保存用户信息
 * @param {*} data
 * @returns
 */
export const saveUserDetailByIdApi = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
