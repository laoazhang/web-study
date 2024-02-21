import request from '@/utils/request'

/**
 * 获取物业费列表
 * @param {*} params
 * @returns
 */
export const getPropetyListAPI = (params) => request({ url: '/park/propertyfee', params })

/**
 * 物业费：预算金额
 * @param {*} params
 * @returns
 */
export const getPaymentAPI = (data) => request({ url: '/park/propertyfee/pre/payment', method: 'POST', data })

/**
 * 新增物业账单
 * @param {*} data
 * @returns
 */
export const createPropetyAPI = (data) => request({ url: '/park/propertyfee', method: 'POST', data })

/**
 * 查看物业账单详情
 * @param {*} id
 * @returns
 */
export const getPropetyDetailAPI = (id) => request({ url: `/park/propertyfee/${id}` })

/**
 * 删除账单
 * @param {*} id
 * @returns
 */
export const delPropetyAPI = (id) => request({ url: `/park/propertyfee/${id}`, method: 'DELETE' })
