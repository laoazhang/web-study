<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: {{$store.state.count}}</p>
      <button @click="addfn(5)">库存+5</button>
  </div>
</template>

<script>
// JS代码：this.$store.state.count

// 用法1：
export default {
  methods:{
    addfn(val){
      // 操作vuex内部数据：按照语法调用方法！
      // commit参数：要调用的方法名，要传入值给value；
      this.$store.commit("add",val);
    }
  }
}
</script>