/**
 * 作用：给object对象定义类型
 * 语法：变量名:{属性名1:Type1; 属性名2:Type2...}
 */
type ObjType = { name: string; age: number; study?: () => void }

let obj: ObjType

obj = {
  name: '李鑫宇',
  age: 18
}
// obj.study()

type StuType = {
  name: string
  age: number
  heigth?: number
  work: (money: number) => number
  study: () => void
  game?: () => void
  [key: string]: any
}


let student: StuType = {
  name: '杨波',
  age: 20,
  work(money) {
    return money
  },
  study() {

  },
  a: 1,
  b: true
}

student.work(1e8)

