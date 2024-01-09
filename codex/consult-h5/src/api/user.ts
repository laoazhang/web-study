import type { PatientList, CodeType, User, UserInfo, Patient } from '@/types/user'
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

// 获取用户详情信息
export function userInfo() {
  return request.get<UserInfo>('/patient/myUser')
}

// 获取患者信息列表
export const getPatientList = () => request.get<PatientList>('/patient/mylist')

// 添加患者信息
export const addPatient = (patient: Patient) => request.post('/patient/add', patient)
