/**
 * 作用：让一个变量可以拥有多个类型值
 * 语法：类型1 | 类型2 ...
 */
let test: number | boolean
test = 1
test = true
// test = '' 报错

let arr: (boolean | string)[]
// // arr可赋值什么类型？
// arr = true
arr = [true, '']

// 解决命名冲突
export { }
