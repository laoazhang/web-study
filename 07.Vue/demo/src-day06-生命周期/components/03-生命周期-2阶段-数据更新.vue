<template>
  <div>
    <p ref="box">库存：{{num}}</p>
    <button @click="num++">+</button>
  </div>
</template>

<script>
// 了解：应用几乎不用！
export default {
  data(){
    return {
      num:99,
    }
  },
  // update：更新、打补丁
  beforeUpdate(){  // 更新前
    // console.log(1);
    console.log(this.$refs.box.innerHTML);
  },
  // 时间点：数据更新后，虚拟dom对比结果，是否更新打补丁到真实dom节点上！
  updated(){  // 更新后,dom真实 整个vue组件，更新后才知识！
    // $nextTick 使用多！
    // console.log(2);
    console.log(this.$refs.box.innerHTML);
  }
}
</script>

<style>

</style>