<template>
  <div>
    <h1>反转世界</h1>
    <h3>{{msg}}</h3>
    <button @click="fn">反转</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:"我是个一堆一堆文字，老师的桌子好像要散架！"
    }
  },
  methods:{
    fn(){
      // 数组
      let arr = this.msg.split("");
      
      // 反数组
      let res = arr.reverse();

      // 变为字符串
      let str = res.join("");

      // 重新赋值
      this.msg = str;
    }
  }

}
</script>

<style>

</style>