<template>
  
  <div class="box">
    <h3>标题：{{item.title}}</h3>
    <p>价格：{{item.price}}元</p>
    <p>开业大酬宾，全场{{item.num}}折</p>
    <h4>库存：{{item.kc}} 件 </h4>
    <button @click="item.kc--">卖一件</button>
  </div>

</template>

<script>
export default {
  // item：语义化知道，形参一会要接受一个对象！
  props:["item"], 
}
</script>

<style scoped>
  .box {
    border: 1px solid #000;
    background-color: pink;
  }
</style>