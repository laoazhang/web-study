// 目标: 使用fs模块
// 1. 引入fs模块
import fs from 'fs'
// 2. 调用它内置导出的方法, 实现对应功能

// (1): 判断文件是否存在
// 语法: fs.access('目标文件路径', 回调函数)
// 作用: 尝试读取指定目标文件, 把结果回传给回调函数, err有值代表报错, 无值成功
const filePath = './data/student.txt'
fs.access(filePath, err => {
    if (err) {
        // 如果err有值, 证明有错误, 文件不存在
        console.log('文件不存在')
    } else {
        // console.log('文件存在')
        // (2): 手动新建目标文件, 写入一些内容
        // 语法: fs.writeFile('目标文件路径', 要写入的字符串, 回调函数)
        // 作用: 向目标文件, 写入指定的字符串进去, 回传结果给回调函数, err有值写入失败, 无值成功
        // const obj = {
        //     name: '小李',
        //     age: 18,
        //     hobby: '写代码'
        // }

        // const jsonStr = JSON.stringify(obj)
        // fs.writeFile(filePath, jsonStr, err => {
        //     if (err) {
        //         console.log('写入报错')
        //         console.log(err);
        //     } else {
        //         console.log('写入成功')
        //     }
        // })

        // (3): 读取目标文件内容
        // 语法: fs.readFile('目标文件路径', 回调函数)
        // 作用: 把目标文件内容, 读取后传递给回调函数的第二个参数并执行回调函数一次
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log('读取失败')
                console.log(err);
            } else {
                // 读取成功
                console.log(data)
                // 但是发现是Buffer(数据流), 计算机中以2进制存储数据, 读出来是16进制的
                // 需要强制转换成字符串显示
                console.log(data.toString());
            }
        })

    }
})


