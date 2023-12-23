import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} page 当前页
 * @param {*} pagesize 每页数量
 * @returns
 */
export const getRoleListApi = (page, pagesize) => {
  return request({
    url: '/sys/role',
    params: {
      page,
      pagesize
    }
  })
}

/**
 * 根据id删除角色
 * @param {*} id 角色id
 */
export const delRoleApi = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
