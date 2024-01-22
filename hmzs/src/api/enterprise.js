import request from '@/utils/request'

/**
 * 获取企业列表
 * @param {*} params
 * @returns
 */
export const getEnterpriseListAPI = (params) => request({ url: '/park/enterprise', params })

