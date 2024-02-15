import request from '@/utils/request'

/**
 * 获取一体杆列表
 * @param {*} params
 * @returns
 */
export const getPoleListAPI = (params) => request({ url: '/pole/info/list', params })

/**
 * 新增一体杆列表
 * @param {*} data
 * @returns
 */
export const createPoleAPI = (data) => request({ url: '/pole/info', method: 'POST', data })

/**
 * 删除一体杆
 * @param {*} ids
 * @returns
 */
export const deletePoleAPI = (id) => request({ url: `/pole/info/${id}`, method: 'DELETE' })

/**
 * 批量删除一体杆信息
 * @param {*} ids
 * @returns
 */
export const deletePoleListAPI = (ids) => request({ url: `/pole/info/${ids.join(',')}`, method: 'DELETE' })

/**
 * 编辑一体杆
 * @param {*} data
 * @returns
 */
export const editPoleAPI = (data) => request({ url: '/pole/info', method: 'PUT', data })
