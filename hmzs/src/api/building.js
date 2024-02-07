import request from '@/utils/request'

/**
 * 楼宇列表查询
 * @param {*} params
 * @returns
 */
export const getBuildingListAPI = (params) => request({ url: '/park/building', params })
