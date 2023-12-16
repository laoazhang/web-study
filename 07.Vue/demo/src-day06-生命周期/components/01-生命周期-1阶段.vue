<template>
  <div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      test:"测试数据"
    }
  },
  // 生命周期函数：内置函数！直接写在export default{内部}
  //              methods: 自己定义函数！
  beforeCreate(){
    console.log(this.test,"beforeCreate");
  },
  // *********************时间点：data初始化数据是否已经初始化完成？
  created(){
    console.log(this.test,"created");
    // 应用场景：ajax获取数据后保存在data初始化数据内！在这个函数内写
  }

}
</script>

<style>

</style>