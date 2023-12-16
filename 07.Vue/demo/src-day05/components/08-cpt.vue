<template>
  <div>
    <h1 v-blue>局部指令：v-blue 只能在当前组件内部使用</h1>
  </div>
</template>

<script>
export default {
  // 局部指令
  directives:{
    // 指令名称blue:{配置}
    blue:{
      inserted(el){  // 当前这个标签第一次渲染为真实dom节点时，执行函数
        el.style.backgroundColor= "blue";
      }
    }
  }
}
</script>

<style>

</style>