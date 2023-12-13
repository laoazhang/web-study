// 目标: 使用path模块
// 1. 引入path模块
import path from 'path'
// 2. 调用它内置导出的方法, 实现对应功能


// (1): 返回路径字符串中的扩展名
// 语法: path.extname('路径字符串')
// 注意: 不用关心此路径文件在不在, 就是处理这个字符串
// 返回值: 提取后缀字符串(带.)

console.log(path.extname('./data/student.json'));
console.log(path.extname('./data/student.js.json'));
console.log(path.extname('./data/a.json.txt'));


// (2): 拼接路径, 使用join方法
// 语法: path.join('路径字符串', ...可以多个)
// 返回值: 从第一个路径往后拼接, 完整的路径字符串
console.log(path.join('a', 'b', 'c'));
console.log(path.join('a', 'b', '../c', 'd'));
console.log(path.join('a', 'b', '..', 'c'));

// (3): 拼接路径, 使用resolve方法
// 语法: path.resolve('路径字符串', ...可以多个)
// 返回值: 从磁盘根目录返回, 完整的路径字符串
console.log(path.resolve('a', 'b', 'c'));
console.log(path.resolve('a', 'b', '../c', 'd'));
console.log(path.resolve('a', 'b', '..', 'c'));