<template>
  <div>
    <!-- 需求1：tab栏的样式切换，弄个变量！多个条件最后只有一个成立！ -->
    <span :class="{active:num==1}" @click="fn(1)">功能1</span>
    <span :class="{active:num==2}" @click="fn(2)">功能2</span>
    <span :class="{active:num==3}" @click="fn(3)">功能3</span>

    <!-- 需求2：准备3个子组件，最终只能给我留下一个！ -->
    <!--     三个给cpt7内部使用，导入其cpt7内部！ -->
    <son-1 v-if="num==1"></son-1>
    <son-2 v-else-if="num==2"></son-2>
    <son-3 v-else></son-3>

  </div>
</template>

<script>
import son1 from "./07-son1.vue"
import son2 from "./07-son2.vue"
import son3 from "./07-son3.vue"
export default {
  components:{
    son1,
    son2,
    son3,
  },
  data(){
    return {
      num:1
    }
  },
  methods:{
    fn(a){
      this.num = a;
    }
  }
}
</script>

<style scoped>
  span {
    display: inline-block;
    width: 100px;
    height: 30px;
    text-align: center;
    border: 1px solid #000;
    margin: 5px;
  }

  .active{
    background-color: #ccc;
  }
</style>