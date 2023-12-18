<template>
  <div>
      <h3>SubItem组件</h3>


      <p>已知库存数(同名): {{count}}</p>
      <p>已知库存数(改名): {{hm_count}}</p>

      <button @click="sub(8)">(同名方法)库存-8</button>
      <button @click="hm_sub(8)">(改名方法)库存-8</button>
  </div>
</template>

<script>
// 1、导入辅助函数mapState
import { mapMutations, mapState } from 'vuex'

export default {
  
  computed:{
    ...mapState('goods',['count','num']),
    ...mapState('goods',{hm_count:'count',hm_num:'num'}),
  },
  methods:{
    ...mapMutations('goods',['sub']),
    ...mapMutations('goods',{hm_sub:'sub'})
  }
}



</script>