<template>
  <div>
    <h1>测试组件</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      info:"我是子组件内的数据"
    }
  },
  methods:{
    fn(){
      console.log("我是子组件内部方法");
    }
  }
}
</script>

<style>

</style>