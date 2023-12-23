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

/**
 * 添加角色
 * @param {*} data
 * @returns
 */
export const addRoleApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data: data
  })
}

/**
 * 根据id查询角色详情
 * @param {*} id 角色id
 * @returns
 */
export const getRoleDetailApi = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 编辑角色信息
 * @param {*} form 编辑角色所需数据
 * @returns
 */
export const editRoleApi = form => {
  return request({
    url: `/sys/role/${form.id}`,
    method: 'put',
    data: form
  })
}
