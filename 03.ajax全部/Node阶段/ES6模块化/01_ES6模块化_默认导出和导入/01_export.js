const a = 10
const b = 20

const fn = () => {
    console.log('这是一个函数')
}

// 默认导出
// export default a  // 导出一个值
export default {
    a,
    b,
    fn
}