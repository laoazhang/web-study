import type { CodeType, User, UserInfo } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request.post<User>('/login/password', { mobile, password })

// 发送验证码
// export const sendMobileCode = (mobile: string, type: CodeType) =>
//   request.get('/code', { params: { mobile, type } })

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request.get<{ code: string }>('/code', { params: { mobile, type } })
}

// 短信登录
export const loginByMobile = (mobile: string, code: string) =>
  request.post<User>('/login', { mobile, code })

export function userInfo() {
  return request.get<UserInfo>('/patient/myUser')
}
