import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 全局自定义指令：directive指令
// Vue.directive("自定义指令名称",{配置})
// 该指令可以在任何组件内使用
Vue.directive("red", {
  inserted(el) {
    // inserted插入，某些标签会用到指令！ 虚拟dom第一次渲染为真是dom节点时候，初始化的时候
    // el:element元素 节点  第一次渲染为真是dom节点
    el.style.backgroudColor = "red"
    // 复杂业务功能！重复功能写在指令内部！vue底层封装webapi的方法！
  }
});

Vue.directive("color", {
  inserted(el, binding) {
    // el:第一次渲染为真实那个dom节点；
    // binding: 后面绑定值一个对象;  binding.value
    el.style.backgroundColor = binding.value;
  }
});


// 需求：设置东西，谁只有拥有这个东西，可以随机开始变背景色，一直颜色跳舞！
//       自己加疯狂：
let timer = null;
// Vue.directive("dance", {
//   inserted(el, binding) { // 第一次渲染为真实dom节点
//     // el:那个真实dom
//     // binding.vulue：传入的指令后面值！
//     timer = setInterval(() => {
//       let a = Math.floor(Math.random() * 256);
//       let b = Math.floor(Math.random() * 256);
//       let c = Math.floor(Math.random() * 256);
//       el.style.backgroundColor = `rgb(${a},${b},${c})`;
//     }, binding.value);
//   },
//   // time1变了：数据变量，新旧虚拟dom，对比，打补丁更新
//   // 当指令后面数据变化的时候，才执行函数！
//   //    形参意义和上面inserted内部是一样！
//   update(el, binding) {
//     clearInterval(timer);

//     timer = setInterval(() => {
//       let a = Math.floor(Math.random() * 256);
//       let b = Math.floor(Math.random() * 256);
//       let c = Math.floor(Math.random() * 256);
//       el.style.backgroundColor = `rgb(${a},${b},${c})`;
//     }, binding.value);
//     // 问题：初始化inserted函数内部定时器没有关！
//     // 解决：给第一个定时器起个名 在函数外声明！
//   }
// });

// 最后：如果inserted内部和update内部代码一样！写为一个函数了！
Vue.directive("dance", function (el, binding) {
  console.log(1);

  clearInterval(timer);
  timer = setInterval(() => {
    let a = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let c = Math.floor(Math.random() * 256);
    el.style.backgroundColor = `rgb(${a},${b},${c})`;
  }, binding.value);

});


new Vue({
  render: h => h(App),
}).$mount('#app') 
