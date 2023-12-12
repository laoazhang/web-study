/*
 * @Author: laoazhang laoazhang@163.com
 * @Date: 2023-12-12 16:17:43
 * @LastEditors: laoazhang laoazhang@163.com
 * @LastEditTime: 2023-12-12 16:17:57
 * @FilePath: \web-study\Ajax全部\Node阶段\Day01_初始Node和ES6模块化语法\01_test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let obj = {
    name: '老李',
    age: 18,
    hobby: '写代码'
}

console.log(`姓名: ${obj.name}, 爱好: ${obj.hobby}`)

// 目标: 用node命令执行此js文件, 并在终端里打印结果
// 1. 新建js文件, 编写代码和打印语句
// 2. 打开集成终端, 输入命令: node 要执行的js文件名 回车即可
// 效果: 在终端里会看到运行打印的结果