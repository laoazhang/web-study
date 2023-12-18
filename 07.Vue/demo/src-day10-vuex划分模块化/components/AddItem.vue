<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: {{$store.state.goods.count}}</p>

      
      <button @click="addfn(5)">库存+5</button>
  </div>
</template>

<script>

// 用法1：
export default {
  methods:{
    addfn(val){
      // this.$store.commit("add",val);  曾经
      this.$store.commit("goods/add",val)  // 现在
    }
  }
}
</script>