import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export const getRoleListAPI = (params) => request({ url: '/park/sys/role', params })

/**
 * 获取tree权限列表
 * @returns
 */
export const getTreeListAPI = () => request({ url: '/park/sys/permision/all/tree' })

/**
 * 获取当前角色权限点列表
 * @param {*} roleId
 * @returns
 */
export const getRoleDetailAPI = (roleId) => request({ url: `/park/sys/role/${roleId}` })

/**
 * 获取角色成员列表
 * @param {*} roleId
 * @returns
 */
export const getRoleUserAPI = (roleId) => request({ url: `/park/sys/roleUser/${roleId}` })

/**
 * 创建角色
 * @returns
 */
export function createRoleUserAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'POST',
    data
  })
}

/**
 * 更改角色
 * @returns
 */
export function updateRoleAPI(data) {
  return request({
    url: `/park/sys/role`,
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 * @returns
 */
export function delRoleUserAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
