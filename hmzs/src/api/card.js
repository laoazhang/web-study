import request from '@/utils/request'

/**
 * 获取楼宇列表
 * @param { page, pageSize} params
 * @returns
 */
export const getCardListAPI = (params) => {
  return request({
    url: 'parking/card/list',
    params
  })
}

/**
 * 新增月卡
 * @param {*} data
 * @returns
 */
export const createCardAPI = (data) => {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}
