import request from '@/utils/request'

/**
 * 获取关联区域下拉列表
 * @returns
 */
export const getAreaNameListAPI = () => request({ url: 'parking/area/dropList' })
