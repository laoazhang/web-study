import request from '@/utils/request'

/**
 * 获取企业列表
 * @param {*} params
 * @returns
 */
export const getEnterpriseListAPI = (params) => request({ url: '/park/enterprise', params })

/**
 * 获取企业所属行业列表
 * @returns
 */
export const getIndustryAPI = () => request({ url: '/park/industry' })

/**
 * 添加企业
 * @param {*} data
 * @returns
 */
export const addEnterpriseAPI = (data) => request({ url: '/park/enterprise', method: 'POSt', data })

/**
 * 查看企业
 * @param {*} id
 * @returns
 */
export const getEnterpriseDetailAPI = (id) => request({ url: `/park/enterprise/${id}` })

/**
 * 编辑企业
 * @param {*} data
 * @returns
 */
export const editEnterpriseAPI = (data) => request({ url: '/park/enterprise', method: 'PUT', data })

/**
 * 删除企业信息
 * @param {*} id
 * @returns
 */
export const deleteEnterpriseAPI = (id) => request({ url: `/park/enterprise/${id}`, method: 'DELETE' })
