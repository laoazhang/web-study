const baseURL = 'http://geek.itheima.net'
const getSum = (numA, numB) => numA + numB
const getArraySum = arr => {
    let sum = 0
    arr.forEach(item => item += sum)
    return sum
}

// 目标: 使用ES6模块化语法, 导出
// 语法: export default {}
// 作用: 导出对象里装入要导出的属性名和值
// 注意: key和value变量名可以简写
export default {
    // url: baseURL,
    // getSum: getSum,
    // getArraySum: getArraySum
    url: baseURL,
    getSum,
    getArraySum
}