import request from '@/utils/request'

/**
 * 楼宇列表查询
 * @param {*} params
 * @returns
 */
export const getBuildingListAPI = (params) => request({ url: '/park/building', params })

/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export const createBuildingListAPI = (data) => request({ url: '/park/building', method: 'POST', data })

/**
 * 删除楼宇
 * @param {*} data
 * @returns
 */
export const delBuildingListAPI = (id) => request({ url: `/park/building/${id}`, method: 'DELETE' })

/**
 * 楼宇详情
 * @param {*} id
 * @returns
 */
export const getBuildingDetailAPI = (id) => request({ url: `/park/building/${id}` })

/**
 * 编辑楼宇
 * @param {*} data
 * @returns
 */
export const editBuildingListAPI = (data) => request({ url: '/park/building', method: 'PUT', data })
