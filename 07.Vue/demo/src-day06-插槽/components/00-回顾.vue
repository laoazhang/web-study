<template>
  <div>
    <p>
      v-model：双向
          原理：绑定:value 及 @input事件监听！用在form表单元素上！
          语法糖：v-model用在组件上！
                 子组件内部1：设置props:["value"]的形参！
                 子组件内部2：内部直接改父级的数据，需要让父级去修改！this.$emit("input",要改成的数据)

                 父组件调用子组件的时候
                        <子组件 :value="父级变量num"  @input="函数"></子组件>  函数(a){ this.num= a; }
                        简写为  v-model="变量名" 
                 特点：不像用在表单元素上那样及时！
           应用：自己封装组件基本上不用，后期elementUI 组件文档用法：知道如何用！

      $refs:
         用处1：获取dom节点（元素对象）！ ref="xxx"相当于是id,  this.$refs.xxx相当于是document.qs("选择器")
                元素对象：属性和方法集合体！调用元素对象上属性 .innerHTML和  方法 .addEventListener()
         用处2：获取组件对象！ (自己造标签)  能用属性和方法！内部data属性和方法都可以使用！
         应用：主要集中后期elementUI  vant / form组件

      $nextTick:
         新知识：数据更新后，新旧虚拟dom,对比结果 打补丁更新到真实dom节点上！
                打补丁更新过程：是异步的！微任务！
                如果获取更新后dom节点上属性：this.$nextTick(()=>{回调函数内部操作dom节点！})

      动态组件
         应用：tab
         语法：component内置组件，is属性，是哪个组件名称，component变为某个组件！
         好处：tab栏，下面各种组件简单写为一个 component :is="name"  name就是某个组件注册的名字！


      自定义指令：公共dom操作！
         应用场景：某些dom操作、样式设置等等！组件内好几个地方都要用！（vue内部：好几个地方要操作相同功能dom）
                  找个公共地方把有同样操作dom代码封装在某个公共地方！公共地方：自定义指令！
         内置两个inserted/update理解，真实不写这两个！
         真实：Vue.directive("指令",(el,binding)=>{    有同样操作dom公共代码      })
         

      
      插槽：特别形参实参：控制结构！
         组件复用性1：结构样式一样，展示的数据不一样，父子通信！
         组件复用性2：有时候组件大部分一样，只有部分结构不一样！传入不同结构！
         子组件内部定义特别形参：<slot></slot> 占位置
         父组件调用子组件传实参：<子组件>  HTML结构 </子组件>

      


    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>