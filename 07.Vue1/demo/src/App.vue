<template>
  <div>
    <!-- *****************************************************v-model原理 -->
    <!-- <cpt-1></cpt-1> -->






    <!-- *****************************************************v-model语法糖 -->
    <!-- <p>父级库存：{{num}}</p> -->
    <!-- <p>父子通信：灵活度非常高，拿到子组件数据后，想怎么操作就怎么操作</p> -->
    <!-- 昨天：父子通信 要求形参单词必须value，通道名称单词input -->
    <!-- <cpt-2 :value="num" @input=fn></cpt-2> -->


    <!-- <p>语法糖：遵循v-model认识，  数据层 到 视图层        视图变为0 到 数据层    </p> -->
    <!-- 今天：为什么要强制性要求用这两个单词？value @input 打中了v-model背后原理！ -->
    <!--      父级这边调用子组件 写法 简单了！ -->
    <!--      数据传入，内部操作后，又把数据变回！ -->
    <!-- <cpt-3 v-model="kc"></cpt-3> -->

    

    <!-- *****************************************************$refs -->
    <!-- 1、ref获取dom节点 -->
    <!-- <cpt-4></cpt-4> -->


    <!-- 2、ref获取组件：小零件对象 ref="box"相当于id    -->
    <!-- <cpt-5 ref="box"></cpt-5>
    <hr>
    <button @click="get">获取组件对象</button> -->

    <!-- *****************************************************$nextTick -->
    <!-- <cpt-6></cpt-6> -->

    <!-- <cpt-7></cpt-7> -->

    <!-- <cpt7dynamic></cpt7dynamic> -->


    <!-- ****************************************************自定义指令 -->
    <!-- <h1 v-red>App.vue内部的标签：全局指令v-red</h1>
    <h1 v-blue>App.vue内部的标签：局部指令v-blue</h1>
    <cpt-8></cpt-8>
    <hr> -->

     <!-- 指令：v-dance="time1"-->
    <!--     1.time1:300给你指令 -->
    <!--     2.v-dance 用起来300！ -->
    <!-- <h1 v-dance="time1">测试1：跳起舞来 time1: 300ms</h1> -->

    <!--     3、time1重新赋值，原来自定义指令inserted内部binding获取不到 time1变化后值 -->
    <!-- <button @click="time1=2000">慢下来：time1: 2000ms</button> -->

 <!-- ****************************************************插槽 -->
    <!-- 组件复用性： -->
    <!--   1、组件内部：使用slot占个形参的位置 -->
    <!--   2、调用组件，传入特别的实参！（HTML结构） -->
    <cpt-9>
      <ul>
        <li>**********</li>
        <li>**********</li>
        <li>**********</li>
        <li>**********</li>
        <li>**********</li>
      </ul>
    </cpt-9>

    <cpt-9>
      <img src="./assets/logo.png" alt="">
    </cpt-9>

    <cpt-9>
      <form action="">
        <input type="text">
      </form>
    </cpt-9>


  </div>
</template>

<script>
import cpt1 from "./components/01-v-model.vue"
import cpt2 from "./components/02-cpt.vue"
import cpt3 from "./components/03-cpt.vue"
import cpt4 from "./components/04-cpt.vue"
import cpt5 from "./components/05-cpt.vue"
import cpt6 from "./components/06-cpt.vue"
import cpt7 from "./components/07-cpt.vue"
import cpt7dynamic from "./components/07-cpt-dynamic.vue"
import cpt8 from "./components/08-cpt.vue"
import cpt9 from "./components/09-cpt.vue"

export default {
  components:{
    cpt1,
    cpt2,
    cpt3,
    cpt4,
    cpt5,
    cpt6,
    cpt7,
    cpt7dynamic,
    cpt8,
    cpt9,
  },
  data(){
    return{
      num:99,
      kc:100,
    }
  },
  methods:{
    fn(a){
      // a：收到信号
      this.num  = this.num + a;
    },
    get(){
      // 该组件对象：子组件内部那个this值，此时在父级内获取；后期组件库遇到时候：
      // 思维拓展：  子组件内部一切都可以拿到了！（数据和方法！）

      console.log(this.$refs.box.info);
      this.$refs.box.fn();
    }
  }

}
</script>

<style>

</style>