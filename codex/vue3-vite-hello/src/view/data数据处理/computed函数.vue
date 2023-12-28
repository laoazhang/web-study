<template>
  <div>
    <h1>computed函数使用</h1>
    <hr>
    <p>list列表</p>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <hr>
    <p>计算数据结果</p>
    <ul>
      <li v-for="item in newList" :key="item">{{ item }}</li>
    </ul>
    <p><button @click="changeList">修改list</button></p>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
  /**
   * 语法：const 变量 = computed(()=>{ return data })
   * 步骤：
      - 从 `vue` 中导入 `computed` 函数
      - 在 `setup` 函数中，使用 `computed` 函数，传入一个函数，函数返回计算好的数据
      - 最后 `setup` 函数返回一个对象，包含该计算属性数据即可，然后模板内使用
   */

   const list = ref([2,3,4,5,6,10])

   // 需求：计算获取list中大于5的数据
   const newList = computed(()=>{
    // 说明：计算逻辑，返回结果
    // 依赖list变量，一旦list发生变化，会重新执行计算
    return list.value.filter(item=>item>5)
   })

   const changeList=()=>{
    list.value.push(Math.random()*10)
   }

</script>

<style scoped>

</style>