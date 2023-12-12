const path = require("path")

// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
    entry: "./src/main.js", // enter: 默认入口
    output: { 
        path: path.join(__dirname, "dist"), // 出口"文件夹"名
        filename: "bundle.js"               // 出口"文件"名
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 以此为基准生成打包后html文件
            template: './public/index.html' 
        })
        
    ],
    mode: 'development', // 开发环境-> 不会极致压缩, 一般开发服务器默认使用这个属性
    devtool: 'cheap-module-source-map', // cheap-module-source-map 开发模式下使用, 保证运行时的行数 和 源代码行数 一致  (默认不写是eval模式)
    devServer: {
        port: 3000, // 端口号
        open: true // 启动后自动打开浏览器
      },
    module: { // 如何处理项目中不同模块文件
        rules: [ // 规则
          {
            test: /\.css$/, // 匹配所有的css文件
            // use数组里从右向左运行
            // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
            // 再用 style-loader 将样式, 把css插入到dom中
            use: [ "style-loader", "css-loader"]
          },
          {
            test: /\.less$/, // 匹配.less结尾文件
            // 使用less-loader, 让webpack处理less文件, 内置还会用less模块, 翻译less代码成css代码
            use: [ "style-loader", "css-loader", 'less-loader']
        },
        {
            test: /\.(png|jpg|gif|jpeg)$/i, // 匹配图片文件
            type: 'asset' // 在导出一个 data URI 和一个单独的文件之间自动选择
        },
        { 
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource',  // 当做静态资源直接复制文件
            generator: {
                filename: 'font/[name].[hash:6][ext]' // 放到dist/font文件夹, 文件名格式如左
            }
        },
        {
            test: /\.js$/, // 匹配js结尾文件
            exclude: /(node_modules|bower_components)/, // 不转换这2个文件夹里的js
            use: { 
                loader: 'babel-loader', // 使用加载器-处理
                options: {
                    presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
                }
            }
        }
        ]
    }
}