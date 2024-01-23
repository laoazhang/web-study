import request from '@/utils/request'

/**
 * 上传文件
 * @param {*} data
 * @returns
 */
export const uploadAPI = (data) => request({ url: '/upload', method: 'POST', data })
