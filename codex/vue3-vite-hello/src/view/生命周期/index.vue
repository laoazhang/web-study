<template>
  <div>
    <h1>vue3常见生命周期</h1>
  </div>
</template>

<script setup>
import { onMounted,onBeforeMount } from "vue";
/**
 * 总结：
 * 1.veu3没有创建阶段=》6个钩子函数
 * 2.vue3钩子函数比vue2先执行
 * 3.onMounted高频使用
 */
onBeforeMount(()=>{
  console.log('挂载前');
})
onMounted(()=>{
  // 使用场景：1.发送请求 2.操作dom
  console.log('挂载了1');
})

onMounted(()=>{
  console.log('挂载了2');
})

</script>

<style scoped>

</style>