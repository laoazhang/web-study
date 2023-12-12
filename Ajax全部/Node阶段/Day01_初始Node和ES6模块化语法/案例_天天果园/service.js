import http from 'http';
import fs from 'fs';
import path from 'path'
const obj = {
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
}
const server = http.createServer();
server.on('request', (req, res) => {
    res.statusCode = 200;
    // 拿到url中的扩展名, 设置本次请求对应响应头内容格式信息
    const extName = path.extname(req.url)
    const contentTypeStr = obj[extName]
    res.setHeader('Content-Type', `${contentTypeStr}; charset=utf-8`);

    if (req.url.startsWith('/api')) {
      // 前端请求例如: http://localhost:3006/api/foot
      // 我们想办法拿到foot后拼接.json就可以自动找到对应文件, 其他路径同理
      // 可以写出一套通用的代码
      const pathArr = req.url.split('/')
      const pathStr = pathArr[pathArr.length - 1]
      // 覆盖掉外面设置的响应头(告诉前端返回的是JSON字符串数据)
      res.setHeader('Content-Type', `application/json; charset=utf-8`);
      fs.readFile(`./data/${pathStr}.json`, (err, data) => {
          if (err) {
              console.log(err)
          } else {
            res.end(data)
          }
      })

    } else if (req.url === '/') {
        // 读取网页文件
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.end(data);
            }
        })
    } else {
        // 根据请求的url拼接读取对应文件的路径并返回
        fs.readFile(`./public${decodeURIComponent(req.url)}`, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                res.end(data);
            }
        })
    }
});

server.listen(3006, () => {
    console.log('服务器启动了, 请访问http://localhost:3006');
});
