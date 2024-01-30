import request from '@/utils/request'

/**
 * 获取计费规则列表
 * @param {*} params
 * @returns
 */
export const getCarRuleListAPI = (params) => request({ url: '/parking/rule/list', params })

/**
 * 添加计费规则
 * @param {*} data
 * @returns
 */
export const createRuleAPI = (data) => request({ url: '/parking/rule', method: 'POST', data })

/**
 * 删除计费规则
 * @param {*} id
 * @returns
 */
export const deleteCarRuleAPI = (id) => request({ url: `/parking/rule/${id}`, method: 'DELETE' })
