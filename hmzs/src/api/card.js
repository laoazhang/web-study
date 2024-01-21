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

/**
 * 获取月卡详情
 * @param {*} id
 * @returns
 */
export const getCardDetailAPI = (id) => {
  return request({
    url: `/parking/card/detail/${id}`
  })
}

/**
 * 修改月卡信息
 * @param {*} data
 * @returns
 */
export const updateCardAPI = (data) => request({ url: '/parking/card/edit', method: 'PUT', data })

/**
 * 删除月卡信息
 * @param {*} ids
 * @returns
 */
export const deleteCardAPI = (id) => request({ url: `/parking/card/${id}`, method: 'DELETE' })

/**
 * 批量删除月卡信息
 * @param {*} ids
 * @returns
 */
export const deleteCardListAPI = (ids) => request({ url: `/parking/card/${ids.join(',')}`, method: 'DELETE' })
