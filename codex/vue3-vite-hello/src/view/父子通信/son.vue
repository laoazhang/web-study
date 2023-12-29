<template>
  <div>
    <h2>子组件</h2>
    <p>{{ money }}$</p>
    <p>{{ msg }}</p>
    <p><button @click="changePar">
      点击修改
    </button></p>
  </div>
</template>

<script setup>

// 2.使用defineProps({变量1，变量2...})
const props = defineProps({
  money:{
    Number,
    default:100
  },
  msg:String
})
// props.money=1e8 // 通过子传父修改
console.log('js使用父传子的变量：',props,props.msg);


// 2.使用defineEmits声明自定义事件，获取emit方法
// emit ===等价于 this.$emit
const emit = defineEmits(['change-mky'])

const changePar=()=>{
  emit('change-mky',1e8)
}


</script>

<style lang="scss" scoped>

</style>