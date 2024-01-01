<template>
  <div>
    <h1>爷爷组件</h1>
    <hr>
    <Son 
    :money="money" 
    :msg="msg" 
    @change-mky="changeMky"></Son>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import Son from './son.vue'

// 场景一：父传子 == 单向数据流 ==
// 1.父组件准备共享数据 e后面代表几个0
const money = ref(1e6)
const msg = ref('老子')


// 场景二：子传父=》 == 单向数据流 ==
// 1. 父组件准备自定义事件和回调函数
/**
 * 
 * @param {*} mky 子组件传过来的数据
 */
const changeMky=(mky)=>{
  money.value=mky
}

// 场景三：跨级通信（爷爷=》孙子通信）=》依赖注入
// 1.注入数据 =》语法： provide('注入数据名字',data)
provide('money',money)

// 注入修改数据的方法
provide('changeMky',changeMky)

</script>

<style lang="scss" scoped>

</style>