<template>
  <div>
    <h1>vue3定义响应变量配合ts使用</h1>
    <ul>
      <li>{{ count }}</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <hr />
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
    <hr />
    <p>{{ newList }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// 导入类型声明文件
import type { List, Data } from '../../types/data'

import { fn } from '../../utils/test'

fn(1, 3)

// 说明：ref是泛型函数，可以接收泛型类型参数
// 1. 简单类型
const count = ref(0)
const str = ref<string>('')

console.log(str)

const data = ref<Data>([])

// 2. 复杂类型(需要指定)
const list = ref<List>([
  // {
  //   id: 0,
  //   name: '学习',
  //   done: false,
  // },
  // {
  //   id: 1,
  //   name: '找工作',
  //   done: false,
  // },
])

// 实际开发，数据从后台异步获取的
setTimeout(() => {
  list.value = [
    {
      id: 0,
      name: '学习',
      done: false,
    },
    {
      id: 1,
      name: '找工作',
      done: false,
    },
  ]
  data.value = [
    {
      name: '张三',
    },
  ]
}, 2000)

// 需求：使用计算属性获取id=1的数据
const newList = computed(() => {
  return list.value.filter((item) => item.id === 1)
})
</script>

<style scoped></style>
