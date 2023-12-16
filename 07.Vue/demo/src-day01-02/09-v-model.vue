<template>
  <div>
    <!-- <input type="text" v-bind:value="msg"> -->
    <!-- <input type="text" :value="msg"> -->
    <!-- v-bind : 单向数据绑定，数据层 *******>  到视图层！ -->

    <input type="text" v-model="msg">
    <!-- 直接v-model，操作就是表单元素value -->
    <!-- v-model: 双向数据绑定  数据层 *******>  到视图层！ -->
    <!--                       数据层 <*******  到视图层！ -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:"我是初始化的数据"
    }
  }
}
</script>

<style>

</style>