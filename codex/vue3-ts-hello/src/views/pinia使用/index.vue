<template>
  <div>
    <h1>pinia使用</h1>
    <ul>
      <li>{{ count }}</li>
      <li>{{ doubleCount }}</li>
      <li @click="store.changeCount">
        修改count
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 使用store
import {storeToRefs} from 'pinia'
// 1.导入pinia的store
import { useHelloStore } from '../../stores/hello'

// 2.获取store
// == 没有解构 == 
const store = useHelloStore()

// 解构使用 问题：数据失去了响应
// const {count,doubleCount,changeCount} = useHelloStore()
// console.log('解构使用',count,doubleCount,changeCount);

// 解决：使用storeToRefs函数解构，注意只能解构ref、reactive、computed定义的响应数据
const {count,doubleCount} = storeToRefs(store)




</script>

<style scoped></style>