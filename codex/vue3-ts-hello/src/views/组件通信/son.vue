<template>
  <div>
    <h2>子组件</h2>
    <p>{{ mky }}</p>
  </div>
</template>

<script setup lang="ts">
// 接受父组件传递数据
// 说明：defineProps是个泛型函数，可以通过传递泛型变量指定props类型
const { mky = 100 } = defineProps<{
  mky: number
}>()

// 子传父修改父组件数据
const emit = defineEmits<{
  // eventName 子传父事件名字 data指定子传父数据类型
  (eventName: 'change-mky', data: number, data2: number): void
  (eventName: 'change-qt', data: number): void
}>()
emit('change-mky', 1e8, 100)
console.log('解构获取父传子变量：', mky)
</script>

<style scoped></style>
