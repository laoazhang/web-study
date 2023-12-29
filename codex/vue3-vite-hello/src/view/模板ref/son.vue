<template>
  <div>
    <h1>son</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1.子组件准备好方法
const validate=()=>{
  console.log(123);
}
const msg = ref('abc')
// 2.提供方法(暴露) => 全局宏方法
defineExpose({
  validate,
  zd:msg
})

</script>

<style lang="scss" scoped>

</style>