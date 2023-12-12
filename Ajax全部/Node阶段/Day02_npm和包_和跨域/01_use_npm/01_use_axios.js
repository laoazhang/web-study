// 目标: 使用axios发请求拿到网易新闻接口数据
// 请求地址: http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html
// 1. 下载axios模块包(npm i axios)
// 2. 引入axios函数
import axios from 'axios'
// 3. 调用axios函数发请求, 原地Promise对象, 用.then拿到成功结果
axios({
    url: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html'
}).then(res => {
    console.log(res);
})