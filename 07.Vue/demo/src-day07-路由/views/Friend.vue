<template>
  <div>
    <h1>Friend组件</h1>
    <p>人名1：{{$route.query.name}} </p>
    <p>人名2：{{$route.params.name}} </p>
  </div>
</template>

<script>
export default {
  // 2.接受数据 VueRouter插件 Vue.use(VueRouter) 
  //     接下来所有vue组件 this上有个属性   this.$route
  //     this.$route.query 可以获取到   ?形式传入的数据 
  //     函数内部：this.$route.query.name
  created(){
    console.log(this.$route.query.name);
    console.log(this.$route.params.name);
  }

 


}
</script>

<style>

</style>