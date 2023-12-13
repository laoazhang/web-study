<template>
  <div>
    <p>作用：给某个标签绑定事件</p>
    <p>语法：v-on:事件名称="后面代码少,一句话!可以直接写到行内"</p>
    <p>语法：v-on:事件名称="后面复杂,写一函数名"</p>
    <p>简写：@事件名称"</p>

    <hr>

    <p>商品数量：{{num}}</p>
    <button v-on:click="num++">+1</button>
    <hr>
    <button v-on:click="fn">+2</button>
    <hr>
    <button @click="fn1">+10000</button>
  </div>
</template>

<script>
export default {
  //初始化数据
  data(){
    return{
      num:15
    }
  },
  // 函数  method：方法
  methods:{
    fn(){
      console.log('你好');
      this.num+=2
    },
    fn1(){
      this.num +=10000
    }
  }

}
</script>

<style>

</style>