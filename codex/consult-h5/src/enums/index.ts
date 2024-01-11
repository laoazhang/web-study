/**
 * 枚举类型场景：用于一组没有语义的可选值，给它们添加类型，从而更加语义化，提高代码可读性
 * 注意：
 * 1. 枚举有值，所以打包后会生成js代码
 * 2. 只能定义在.ts格式
 */
// const abc: number = 123
// // 问题：不够语义化，代码易读性差
// export type Gender1 = 0 | 1

// // 解决：使用枚举类型定义
// export enum Gender {
//   Gril,
//   Boy
// }
// console.log(Gender.Boy, abc)

// 1. 极速问诊
// 问诊类型：1找医生 2== 极速问诊 == 3开药问诊
export enum ConsultType {
  Doctor = 1,
  Fast = 2,
  Medication = 3
}
// 患病时间：1一周内2一月内3半年内4半年以上
export enum ConsultTime {
  Week = 1,
  Month,
  HalfYear,
  More
}

// 2. 问诊室
// 消息类型
export enum MsgType {
  // 文字
  MsgText = 1,
  // 图片
  MsgImage = 4,
  // 患者
  CardPat = 21,
  // 处方
  CardPre = 22,
  // 未评价
  CardEvaForm = 23,
  // 已评价
  CardEva = 24,
  // 通用系统
  Notify = 31,
  // 温馨提示
  NotifyTip = 32,
  // 取消订单
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  // 未支付
  NotPayment = 1,
  // 已支付
  Payment = 2,
  // 无效
  Invalid = 3
}

// 问诊订单状态
export enum OrderType {
  // ----------------问诊订单------------------
  // 待支付
  ConsultPay = 1,
  // 待接诊
  ConsultWait = 2,
  // 咨询中
  ConsultChat = 3,
  // 已完成
  ConsultComplete = 4,
  // 已取消
  ConsultCancel = 5,
  // ----------------药品订单------------------
  // 待支付
  MedicinePay = 10,
  // 待发货
  MedicineSend = 11,
  // 待收货
  MedicineTake = 12,
  // 已完成
  MedicineComplete = 13,
  // 已取消
  MedicineCancel = 14
}
