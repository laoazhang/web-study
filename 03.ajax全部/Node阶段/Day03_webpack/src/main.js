// webpack打包的入口
import { addFn } from './add/add'
import { getArraySum } from './tool/tool'
import $ from 'jquery'
import "./css/index.css"
import "./less/index.less"
// 引入图片-使用
import imgUrl from './assets/1.gif'
// 引入字体图标文件
import './assets/fonts/iconfont.css'

const theImg = document.createElement("img")
theImg.src = imgUrl
document.body.appendChild(theImg)

console.log(addFn(5, 2));
console.log(getArraySum([5, 6, 9, 10]));

$(function() {
    $('#myUL>li:nth-child(2n+1)').css('color', 'red')
    $('#myUL>li:nth-child(2n)').css('color', 'green')
  })

  const fn = () => { // 高级语法
    console.log("你好babel");
  }
  console.log(fn) // 一定打印函数, 才会被webpack把"函数体"打包起来

