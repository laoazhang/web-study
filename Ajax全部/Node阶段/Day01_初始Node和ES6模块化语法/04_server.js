// 1. 加载http模块
import http from 'http';

// 2. 创建服务对象，一般命名为server
const server = http.createServer(); // create创建、server服务器

// 3. 给server对象注册请求（request）事件，监听浏览器的请求。只要有浏览器的请求，就会触发该事件
server.on('request', (req, res) => {
    //设置响应状态码
    res.statusCode = 200;
    // 设置响应头(确保中文能正确返回, 编码显示)
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    // 设置响应体
    res.end('hello，欢迎访问web服务，这是服务端给你的回应');
});

// 4. 设置端口，开启服务
server.listen(3000, () => {
    console.log('服务器启动了');
});