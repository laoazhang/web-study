/**
 * 高频使用
 * 作用：给变量添加类型约束
 * 语法=》变量名:类型  => 类型范围：
 * - JS 已有类型
    - 简单类型，`number` `string` `boolean` `null` `undefined`
    - 复杂类型，对象 数组 函数
  - TS 新增类型
    - 联合类型、自定义类型(类型别名)、接口、元组、字面量类型、枚举、void、any、泛型 等
 */
let hello: string = 'hi'

hello = 'hi vue3'
// hello = 123

let abc: boolean = true

// abc = 123
abc = false

let test: null = null
test = null