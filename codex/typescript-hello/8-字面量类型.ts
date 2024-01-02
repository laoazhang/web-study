/**
 * 说明：具体值作为类型=》字面量类型 =》有点像使用const定义常量
 */
let name: 'test' = 'test'
let age: 20 = 20

// 思考？
let str1 = 'Hello TS';
str1 = ''

const str2 = 'Hello TS';
// str2 = '' 报错

// 场景一：变量可选值列表，代码提示
// type Gender = '男' | '女'
let gender: '男' | '女' | '男女' = "男女"
gender = '女'

// 场景二：函数参数可选值列表，代码提示
// 使用自定义类型:
type Direction = 'up' | 'down' | 'left' | 'right'

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 调用函数时，会有类型提示：
changeDirection("right")


export { }