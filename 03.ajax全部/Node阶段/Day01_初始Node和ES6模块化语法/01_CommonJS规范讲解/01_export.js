/*
 * @Author: laoazhang laoazhang@163.com
 * @Date: 2023-12-12 16:21:20
 * @LastEditors: laoazhang laoazhang@163.com
 * @LastEditTime: 2023-12-12 16:27:01
 * @FilePath: \web-study\Ajax全部\Node阶段\Day01_初始Node和ES6模块化语法\01_export.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 模块内的工具变量和方法
const baseURL = 'http://geek.itheima.net'
const getSum = (numA, numB) => numA + numB
const getArraySum = arr => {
    let sum = 0
    arr.forEach(item => item += sum)
    return sum
}

// 目标: 想要被外部使用的话, 需要"导出"
// 语法: module.exports = {}
// 作用: 把要导出的装入此对象内(key是外部要使用的, value是内部导出的值)
// 注意: 外部无法使用未导出的变量
module.exports = {
    url: baseURL
}