<template>
  <div>
    <ul>
      <li v-for="(item,i) in list" :key="i">{{item}}</li>
    </ul>
    <h1>总分由方法调用：{{ zongf() }}</h1>
    <h1>总分由方法调用：{{ zongf() }}</h1>
    <h1>总分由方法调用：{{ zongf() }}</h1>
    <hr>

    <h1>总分由计算属性：{{ zongff }}</h1>
    <h1>总分由计算属性：{{ zongff }}</h1>
    <h1>总分由计算属性：{{ zongff }}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[60,70,50]
    }
  },
  // 方法
  methods:{
    // 用常规方法调用，返回值！学啥计算属性？
    zongf(){  
      console.log("方法调用");
      return this.list.reduce((sum,item)=>sum+=item,0);
    }
  },
  // 计算属性：缓存特性！性能高！
  computed:{
    zongff(){
      console.log("计算属性");
      return this.list.reduce((sum,item)=>sum+=item,0);
    }
  }
}
</script>

<style>

</style>