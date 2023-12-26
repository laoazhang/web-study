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

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function getPersonalDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function updatePersonalApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function getJobDetailApi(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function updateJobApi(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

/** *
 * 给员工分配角色
 * ***/
export function assignRolesApi(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}

