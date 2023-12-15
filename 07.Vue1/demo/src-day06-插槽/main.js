import Vue from 'vue' // 导入vue框架
import App from './App' // 导入 组件App


Vue.config.productionTip = false

// 全局
// Vue.directive("color", {
//   // 初始化渲染为真实dom节点时候
//   inserted(el, binding) {
//     el.style.backgroundColor = binding.value;
//     // 里面还能写：DOM操作！
//     //     el：真实dom节点时候
//     //     binding：用户给传入的值
//   },
//   // 更新：指令后面变量如果数据发生更新的时候
//   update(el, binding) {
//     el.style.backgroundColor = binding.value;
//   }
// });

// 应用自定义指令：下面写法
Vue.directive("color", (el, binding) => {
  el.style.backgroundColor = binding.value;
});




new Vue({
  render: h => h(App),
}).$mount('#app')