<template>
  <div>
    <h1>按键修饰符</h1>
    <input type="text" @keydown.enter="fn1" @keydown.esc="fn2" />
  </div>
</template>

<script>
export default {
  // 事件类型：click    keydown：按下     keyup：弹起来
  //         曾经：需要获取事件对象e,  e.key可以知道现在按的是哪个键
  //         现在：按键修饰符(非常简单)
  methods: {
    fn1(){
      console.log(1);
    },
    fn2(){
      console.log(2);
    }
  },
};
</script>

<style>
</style>