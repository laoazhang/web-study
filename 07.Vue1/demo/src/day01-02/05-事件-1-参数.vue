<template>
  <div>
    <h1>v-on</h1>
    <p>商品数量：{{ num }}</p>
    <p>
      语法： @click="函数名" 如果没有参数,直接写个函数名即可
      语法：如果有参数，函数名(实参,...)
    </p>
    <p>
      <button @click="add(7)">+几件</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 10,
    };
  },
  methods: {
    add(a) {
      this.num += a;
    },
  },
};
</script>


<style>
</style>