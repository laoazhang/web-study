<template>
  <div>
    <h1>库存：</h1>
    <p> {{value}}</p>
    <button @click="end">归零</button>

  </div>
</template>

<script>
export default {
  props:["value"],  // 形参，接受实参的值！
  methods:{
    end(){

      // 收发信号：通道名称必须单词input，
      this.$emit("input",0);
    }
  }
}
</script>

<style>

</style>