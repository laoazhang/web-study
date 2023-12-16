<template>
  <div>
    <p id="box">我是测试标签</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:"测试数据"
    }
  },
  // Mount：镶嵌 嵌入
  beforeMount(){
    console.log(document.querySelector("#box"),"beforeMount");
    console.log(this.msg);
  },
  // template内部 html结构 是否 渲染真实dom节点
  mounted(){
    console.log(document.querySelector("#box"),"mounted");
    console.log(this.msg);
    // 后期：可能会看到，有的ajax代码写在这！
    // 注意：获取操作dom，用的不多！非常少！
  }
}
</script>

<style>

</style>