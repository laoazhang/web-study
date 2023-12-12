// 目标: 引入moment模块, 格式化时间
// 1. 下载moment (npm i moment)
// 2. 引入moment对象
import moment from 'moment'
// 3. 使用内置的方法格式化日期对象
console.log(moment(new Date()).format('YYYY-MM-DD'));