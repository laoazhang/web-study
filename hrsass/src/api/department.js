import request from '@/utils/request'

/**
 * 获取部门列表
 * @returns
 */
export const getDeparmentListApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id 删除的部门id
 * @returns
 */
export const delDepartmentApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 添加部门
 * @param {*} data
 * @returns
 */
export const addDepartmentApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data: data
  })
}

/**
 * 根据id查询部门详情
 * @param {*} id 部门id
 * @returns
 */
export const getDepartmentDetailApi = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 修改部门
 * @param {*} form 编辑部门所需参数
 * @returns
 */
export const editDepartmentApi = (form) => {
  return request({
    url: `/company/department/${form.id}`,
    method: 'PUT',
    data: form
  })
}
