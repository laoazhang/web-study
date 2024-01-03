<template>
  <div>
    <h1>父组件</h1>
    <hr />
    <Son :mky="money" @change-mky="cg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Son from './son.vue'

// 1. 父传子
// const money = ref(1e6)
const money = ref()

// 2. 子传父回调
const cg = (data: number, data2: number) => {
  money.value = data
  console.log(data, data2)
}
</script>

<style scoped></style>
