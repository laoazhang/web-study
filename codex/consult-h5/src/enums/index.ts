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
