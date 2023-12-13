// 目标: 导入模块过来, 拿到模块暴露出来的值使用
// 语法: require('模块标识')
// 返回值: 模块内导出的对象
// 解释: 模块标识, 目标模块文件路径和文件名
// 查看: 执行此js文件, 把它交给node执行, 打印结果
const obj = require('./01_export.js')
console.log(obj);