import request from '@/utils/request'

/**
 * 根据id查询公司信息
 * @param {*} id
 * @returns
 */
export const getCompanyInfoApi = (id) => {
  return request({
    url: `/company/${id}`
  })
}
