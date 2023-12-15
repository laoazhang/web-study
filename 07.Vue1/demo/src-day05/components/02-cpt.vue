<template>
  <div>
    <h1>库存：</h1>
    <p> {{value}}</p>
    <button @click="sale">卖几件</button>

  </div>
</template>

<script>
export default {
  props:["value"],  // 形参，接受实参的值！
  methods:{
    sale(){
      // this.value -=7; // 直接操作数据，为什么不行？

      // 收发信号：通道名称必须单词input，
      this.$emit("input",-7);
    }
  }
}
</script>

<style>

</style>