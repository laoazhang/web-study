<template>
  <div>
    <h1>数量：{{num}}</h1>
  </div>
</template>

<script>
export default {
  // props:["num"]
  props:{
    // 形参名称：对象配置对传入实参、形参 有要求
    num:{
      type:Number,  // 数字类型
      // required:true,  // 必传项
      default:100,  // 默认值
      // 自定义验证
    }
  }
}
</script>

<style>

</style>