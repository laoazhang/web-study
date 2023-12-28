<template>
  <div>
    <ul>
      <li>{{ msg }}</li>
      <li @click="fn">{{ hi }}</li>
      <li ></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:'hi vue2 data'
    }
  },
  beforeCreate () {
      console.log('vue2-beforeCreate执行',this);;
    },
  setup () {
    console.log('setup函数执行了',this);
    // vue3代码都写到这里
    let hi = 'hi setup vue3'
    const fn=()=>{
      console.log(123);
    }
    return {hi,fn}
  }
}
</script>

<style lang="scss" scoped>

</style>