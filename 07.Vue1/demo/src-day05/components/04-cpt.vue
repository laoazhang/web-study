<template>
  <div>
    <h1>$refs</h1>
    <p ref="aaa">原因1：某些业务用vue语法绕的远，webapi DOM操作反而非常简单！</p>
    <p id="box">原因2：后期很多elementUI（PC）  vant（移动） 封装好组件，也用$refs知识！</p>

    <button @click="get">获取p标签</button>
  </div>
</template>

<script>
export default {
  methods:{
    get(){
      // 1、直接写webapi代码：基于浏览器（BOM+DOM！）
      // let p = document.querySelector("#box");
      
      // 2、ref="aaa" 相当于所谓id值；  this.$refs相当于：document.querySelector
      console.log(this.$refs.aaa);
    }
  }
}
</script>

<style>

</style>