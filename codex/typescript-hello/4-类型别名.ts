/**
 * 作用：复用类型,提高类型的可维护性
 * 语法：type 类型名 = 类型
 */
type NbType = number | boolean
type ArrType = (string | number)[]


// 不建议
let test: number | boolean
let test2: number | boolean

// 建议使用类型别名
let test3: NbType

test3 = 1
test3 = true
// test3 = []

let arr: ArrType = [1, '']

export { }

