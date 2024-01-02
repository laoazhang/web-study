/**
 * 作用：定义对象类型
 * 语法：interface 接口名 { 属性名1:Type1; 属性名2:Type2... } 
 */
// 类型别名定义
type StuType = {
  name: string
  age: number
  heigth?: number
  work: (money: number) => number
  study: () => void
  game?: () => void
}

type StuPlug = {
  isSingle?: boolean
  sarly: number
}


// 1. 接口定义对象类型
interface Istu {
  name: string
  age?: number
  heigth?: number
  work: (money: number) => number
  study: () => void
  game?: () => void
}

// 2. 继承另外一个接口类型定义
interface Iplugs {
  isSingle: boolean
  sarly: number
}

interface Istu extends Iplugs {
  //  test:number
}

let stu: Istu = {
  name: '杨波',
  // age: 20,
  work(money) {
    return money
  },
  study() {

  },
  isSingle: true,
  sarly: 1e8
}


// 3. 使用交叉类型合并多个类型别名
type NewType = StuType & StuPlug & {
  a: string
}

let stu2: NewType = {
  name: '杨波',
  age: 20,
  work(money) {
    return money
  },
  study() {

  },
  isSingle: true,
  sarly: 1e8,
  a: ''
}

// stu2.



export { }
