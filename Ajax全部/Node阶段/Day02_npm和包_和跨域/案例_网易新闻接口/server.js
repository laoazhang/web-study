import axios from 'axios'
import http from 'http'



let apiObj = {
    '/api/head': 'http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html',
    '/api/happy': 'http://c.m.163.com/nc/article/list/T1348648517839/0-40.html',
    '/api/sports': 'http://c.m.163.com/nc/article/list/T1348649079062/0-40.html',
    '/api/money': 'http://c.m.163.com/nc/article/list/T1348648756099/0-40.html',
    '/api/technology': 'http://c.m.163.com/nc/article/list/T1348649580692/0-40.html'
}



const server = http.createServer()
server.on('request', (req, res) => {
    if (req.url.startsWith('/api')) {
        axios({
            url: apiObj[req.url]
        }).then(result => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            // 支持浏览器ajax跨域访问, * 代表任意人都可以来请求
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(JSON.stringify(result.data))
        })
    } else {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('请访问/api开头的接口地址拿到数据')
    }



})
server.listen(3000, () => {
    console.log('服务器启动成功: http://localhost:3000');
})