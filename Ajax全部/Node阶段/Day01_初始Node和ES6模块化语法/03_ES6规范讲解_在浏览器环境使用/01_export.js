const baseURL = 'http://geek.itheima.net'
const getSum = (numA, numB) => numA + numB
const getArraySum = arr => {
    let sum = 0
    arr.forEach(item => item += sum)
    return sum
}

// 导出对象, 并携带模块内部值
export default {
    baseURL,
    getSum,
    getArraySum
}