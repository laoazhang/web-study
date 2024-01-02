/**
 * 作用：约束数组变量
 * 语法：
 * 1. 数组变量名:原始类型[]
 * 2. 数组变量名:Array<原始类型>
 */
// 写法1
let arr1: number[] = [1, 2, 3]

// arr1 = [1,2, '']

let arr2: string[]

// arr2 = [1,22] // 报错
arr2 = ['', 'dfd', '']

// 写法2
let arr3: Array<boolean>

arr3 = [true, false]