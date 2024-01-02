/**
 * 作用：any 类型的作用是逃避 TS 的类型检查
 */
// 情况1：指明为any
let test: any = { a: 1, b: '' }
test.a = 12
test = 100
test = true

// 情况2：隐式any
let abc

abc = 1
abc = {}






export { }