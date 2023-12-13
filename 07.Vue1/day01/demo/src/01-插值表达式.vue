<template>
  <!-- 只有一个根标签 -->
  <div id="app">
    <h1>App.vue最跟组件</h1>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ money }}</p>
    <p>{{ msg }}</p>
    <p>{{ list[0] }}</p>
    <p>{{ obj.name}}</p>
    <p>{{ obj.age > 18 ? '成年' : '未成年' }}</p>
  </div>
</template>

<script>
// script下面：要写js代码
let a = 10;

//组件内部：script标签默认要求这样写
export default {
  data() {
    return {
      money: 100,
      msg: "hello",
      list: ["张三", "李四"],
      obj: {
        name: "小红",
        age: 19,
      },
    };
  },
};
</script>

<style lang="less">
#app {
  background-color: pink;
}
h1 {
  color: green;
}
</style>
