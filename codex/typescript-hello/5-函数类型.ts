/**
 * 作用：给函数参数和返回值指定类型
 * 语法：
 * type FnType = (a:type1, b:type2)=> type3
 */

// 1. 箭头函数
const fn1 = (a: number, b: number): string => {
  return a + b + ''
}
fn1(1, 2)

// 2. 普通函数
function fn2(a: number, b: number): number {
  return a + b
}
fn2(1, 6)

// 3. 类型别名形式
type FnType = (a: number, b: number) => number

const fn3: FnType = (a, b) => {
  return a + b
}

const fn4: FnType = (a, b) => {
  return a + b
}

// 4. 函数没有返回值
const fn5 = (a: string, b: string): void => {

}

// 5. 函数有些参数非必传怎么设置
const fn6 = (a: number, b?: string): void => {

}

fn6(1)




export { }