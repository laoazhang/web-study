
<template>
  <div>
    <h1>孙子</h1>
    <p @click="changeMky(1e4)">收到爷爷的钱:{{ mky }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue';


// 2.接收注入到数据
const mky = inject('money')
const changeMky = inject('changeMky')

</script>

<style lang="scss" scoped>

</style>