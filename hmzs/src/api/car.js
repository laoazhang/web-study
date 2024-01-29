import request from '@/utils/request'

/**
 * 获取计费规则列表
 * @param {*} params
 * @returns
 */
export const getCarRuleListAPI = (params) => request({ url: '/parking/rule/list', params })
