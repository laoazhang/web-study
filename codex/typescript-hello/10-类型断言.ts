/**
 * 作用：给变量添加更加具体类型
 */

// 场景一：获取dom对象
const domA = document.getElementById('ac') as HTMLAnchorElement
// 说明：默认通过类型推荐=》HTMLElement =》范围太广，不够具体
domA.href = 'http:www.baidu.com'

// 场景二：设置默认值为空对象，可以使用as添加类型约束
type Res = {
  msg: string
  data: number[]
}
// let data:Res = {}
// 需要发请求获取数据，默认值设置{}空对象
let data = {} as Res

data.msg = ''
