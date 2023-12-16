<template>
  <div>
    <h1>v-bind</h1>
    <p>作用: 插值表达式用于行外数据绑定! v-bind用于行内</p>
    <p>语法: v-bind:标签内属性名</p>
    <a v-bind:href="url">百度</a>
    <a :href="url">百度</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "http://www.baidu.com",
    };
  },
};
</script>

<style>
</style>