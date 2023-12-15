<template>
  <div>
    <!-- <input type="text" v-bind:value="msg"> -->
    <!-- <input type="text" :value="msg"> -->
    <!-- v-bind : 单向数据绑定，数据层 *******>  到视图层！ -->

    <!-- <input type="text" v-model="msg"> -->
    <!-- 直接v-model，操作就是表单元素value -->
    <!-- v-model: 双向数据绑定  数据层 *******>  到视图层！ -->
    <!--                       数据层 <*******  到视图层！ -->


    <!-- v-model对于表单：直接用，不用关注value checked -->
    <!-- <input type="checkbox" v-model="key">
    <textarea v-model="msg"></textarea>
    <select name="" id="" v-model="num">
      <option value="1">北京</option>
      <option value="2">上海</option>
      <option value="3">大同</option>
    </select> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:"我是初始化的数据",
      key:true,
      num:"3",
      age:10,
    }
  }
}
</script>

<style>

</style>