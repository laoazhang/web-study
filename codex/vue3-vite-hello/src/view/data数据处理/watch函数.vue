<template>
  <div>
    <h1>warch函数的使用</h1>
    <hr>
    <ul>
      <li @click="count++">{{ count }}</li>
      <li @click="bool=!bool">{{ bool }}</li>
      <li>{{ obj }}</li>
      <li><button @click="obj.age++">修改obj</button></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script setup>
import {watch,ref} from 'vue'
/**
 * 语法1：warch(变量,()=>{},{deep:true,immediate:true})
 * 语法2：warch([变量1,变量2...],()=>{},{deep:true,immediate:true})
 * 
 * 语法3(了解)：warch(()=>变量.属性,()=>{})
 */
const count = ref(0)
const bool = ref(false)
watch([count,bool],(newVal,oldVal)=>{
  console.log('count变化了',newVal,oldVal);
})

const obj = ref({
  name:'张安',
  age:18  
})

watch(obj,(newVal,oldVal)=>{
  console.log('obj变化了:',newVal,oldVal);
},{
  deep:true, //开启深度监听
  immediate:true //页面加载后立即执行一次监听
})

watch(()=>obj.value.age,(newVal,oldVal)=>{
  console.log('obj的age变化了:',newVal,oldVal);
})

</script>

<style scoped>

</style>