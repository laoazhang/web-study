<template>
  <div class="box-148" style="color:green">测试组件：内部自己定义name</div>
</template>

<script>
export default {
  name:"HmCpt",  // 规范：大驼峰
  data(){
    return {
      // 变量：局部作用域，肯定不会污染
    }
  }
}
</script>

<style scoped>
  /* 样式污染原因： */
  /*       webpack: 开发环境，也会把样式和前面组件组件样式全部，写在一起！ */
  /*       div样式：会对其他组件内div有污染！ */

  /* 解决： */
  /*       1、起个特别的类名，命名不会重复！zhc-box */
  /*       2、!!! style scoped：局部的私有的！了解！*/
  /*           vue内部给当前标签上加 特有属性名，只有当前组件有！ */
  /*           div[特有属性名]：只能当前组件用！ */
  div {
    background-color: yellow;
  }
</style>