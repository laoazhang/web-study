import request from '@/utils/request'

// 获取权限
export function getPermissionListApi() {
  return request({
    method: 'get',
    url: '/sys/permission'
  })
}
// 新增权限
export function addPermissionApi(data) {
  return request({
    method: 'post',
    url: '/sys/permission',
    data
  })
}

// 更新权限
export function updatePermissionApi(data) {
  return request({
    method: 'put',
    url: `/sys/permission/${data.id}`,
    data
  })
}

// 删除权限
export function delPermissionApi(id) {
  return request({
    method: 'delete',
    url: `/sys/permission/${id}`
  })
}
// 获取权限详情
export function getPermissionDetailApi(id) {
  return request({
    method: 'get',
    url: `/sys/permission/${id}`
  })
}
