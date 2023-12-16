<template>
  <div>
    <!-- 具名插槽：名字不是写在标签上，写在template上 -->
    <!-- <cpt2>
      <template v-slot:title>
        <p>我是一首诗的名字</p>
      </template>
      
      <template v-slot:content>
        <ul>
          <li>xxxxxx</li>
          <li>xxxxxx</li>
          <li>xxxxxx</li>
          <li>xxxxxx</li>
        </ul>
      </template> 
    </cpt2> -->

     <!-- 简写为 #name -->
    <!-- <cpt2>
 
      <template #title>
        <h2>vue logo</h2>
      </template>

      <template #content>
        <img src="./assets/logo.png" alt="">
      </template>
    </cpt2> -->


    <!-- 获取暴露数据：v-slot="随便起个变量，不需要在data内初始化" -->
      <!--             getSon拿到 {aaa:"xxxxxxxxxx"} -->
    <!-- <cpt3>
      
      <template v-slot="getSon">
        <img :src="getSon.aaa" alt="">
      </template>
    </cpt3>

    <cpt3>
      <template v-slot="getSon">
        <a :href="getSon.aaa">点击转跳</a>
      </template>
    </cpt3> -->


    <!-- 变化结构： -->
    <!--     1、子组件向外暴露数据 -->
    <!--     2、父组件拿数据 getSon===> {  obj:{name,age,sex}   }-->
    <!-- <cpt4>
      <template v-slot="scope">
        <h1>{{scope.row.name}}</h1>
        <h2>{{scope.row.age}}</h2>
        <h3>{{scope.row.sex}}</h3>
      </template>
    </cpt4> -->


    <cpt5>
      <!-- 先犯错：v-slot:t  v-slot="scope，  -->
      <!-- 后整合： v-slot:t="scope"-->
      <template v-slot:t="scope" >
        <h1>{{scope.row.title}}</h1>
      </template>
      
      <template #c="scope">
        <ul>
          <li>{{scope.row.content}}</li>
          <li>{{scope.row.content}}</li>
          <li>{{scope.row.content}}</li>
          <li>{{scope.row.content}}</li>
        </ul>
      </template>
    </cpt5>


  </div>
</template>

<script>
import cpt1 from "./components/01-自定义指令回顾.vue"
import cpt2 from "./components/02-具名插槽.vue"
import cpt3 from "./components/03-作用域插槽.vue"
import cpt4 from "./components/04-作用域插槽.vue"
import cpt5 from "./components/05-具名与作用域插槽.vue"
export default {
  components:{
    cpt1,
    cpt2,
    cpt3,
    cpt4,
    cpt5,
  }
}
</script>

<style>

</style>