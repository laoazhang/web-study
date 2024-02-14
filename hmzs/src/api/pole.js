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
