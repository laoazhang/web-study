<template>
  <div>
    <p>地图业务：老人追踪</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      timer:null,
    }
  },
  // 组件初始化：实时请求后台接口，返回坐标
  created(){
    // 能给初始化变量赋值：
    this.timer = setInterval(()=>{
      // ajax
      console.log(Math.random());
    },1000);
  },

  // 需求：应该在组件销毁之前，把定时器任务代码，关闭！
  // Destroy:销毁
  beforeDestroy(){  // 之前
    clearInterval(this.timer);
  },
  // 该组件已经被销毁
  destroyed(){
  }
}
</script>

<style>

</style>