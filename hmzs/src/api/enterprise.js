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

/**
 * 获取楼宇列表
 * @returns
 */
export const getRentBuildListAPI = () => request({ url: '/park/rent/building' })

/**
 * 创建合同
 * @param {*} data
 * @returns
 */
export const createRentAPI = (data) => request({ url: '/park/enterprise/rent', method: 'POST', data })

/**
 * 获取合同列表
 * @param {*} id
 * @returns
 */
export const getRentListAPI = (id) => request({ url: `/park/enterprise/rent/${id}` })

/**
 * 退租租赁合同
 * @param {*} id
 * @returns
 */
export const outRentAPI = (id) => request({ url: `/park/enterprise/rent/${id}`, method: 'PUT' })
