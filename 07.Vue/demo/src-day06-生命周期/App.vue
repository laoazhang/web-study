<template>
  <div>
    <!-- <cpt1></cpt1> -->
    <!-- <cpt2></cpt2> -->
    <!-- <cpt3></cpt3> -->
    <cpt4 v-if="key"></cpt4>
    <hr>
    <button @click="key=false">关闭老人追踪功能</button>
  </div>
</template>

<script>
import cpt1 from "./components/01-生命周期-1阶段.vue"
import cpt2 from "./components/02-生命周期-2阶段.vue"
import cpt3 from "./components/03-生命周期-2阶段-数据更新.vue"
import cpt4 from "./components/04-生命周期-3阶段.vue"
export default {
  data(){
    return {
      key:true,
    }
  },
  components:{
    cpt1,
    cpt2,
    cpt3,
    cpt4,
  }
}
</script>

<style>

</style>