<template>
  <div>
    <!-- 需求1：tab栏的样式切换，弄个变量！多个条件最后只有一个成立！ -->
    <span @click="name='son1'"  :class="{active:name=='son1'}">功能1</span>
    <span @click="name='son2'"  :class="{active:name=='son2'}">功能2</span>
    <span @click="name='son3'"  :class="{active:name=='son3'}">功能3</span>

    <!-- 需求2：准备3个子组件，最终只能给我留下一个！ -->
    <!--       组件：vue内置的，component -->
    <!--       is： 是组件名字，当前component被替换为对应组件！ -->
    <!--       更简单：代码量少一点！ -->
    <component :is="name"></component>
    

  </div>
</template>

<script>
import son1 from "./07-son1.vue"
import son2 from "./07-son2.vue"
import son3 from "./07-son3.vue"
export default {
  components:{
    son1, // son1:son1
    son2,
    son3,
  },
  data(){
    return {
      name:"son1"
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