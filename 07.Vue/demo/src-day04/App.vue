<template>
  <div>
    <!-- <h1>组件引导：</h1>
    <cpt1></cpt1>
    <cpt2></cpt2>
    <hm-cpt></hm-cpt> -->

    <h1>超市商品列表：</h1>

    <!-- 3、所谓调用函数：传实参！ -->
    <!-- <cpt-4 title="超级好吃口水鸡" price="80" num="6"></cpt-4> -->
    <!-- <cpt-4 title="泰国榴莲" price="288" num="9"></cpt-4> -->

    <!-- 绑定变量 -->
    <!-- <cpt-4 :title="title" :price="price" :num="num"></cpt-4> -->

    <!-- 商品数据：后台给的list数组对象 -->
    <p v-for="item in list" :key="item.title">{{item.title}} 库存：{{item.kc}} </p>
    <hr>
    <!-- <cpt-4
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :num="item.num"
      :kc="item.kc"
      :id="item.id"
      @aaa="fnn"
    ></cpt-4> -->

    <cptt-4
      v-for="item in list"
      :key="item.id"
      :item="item"
    ></cptt-4>



    <!-- <cpt-5></cpt-5> -->






  </div>
</template>

<script>
import cpt1 from "./components/01-cpt.vue";

import cpt4 from "./components/04-cpt.vue";
import cptt4 from "./components/04-cptt.vue";

import cpt5 from "./components/05-cpt.vue";
export default {
  data() {
    return {
      title: "火鸡面",
      price: 10,
      num: 5,
      list: [
        {
          id: 1,
          title: "good-1",
          price: 10,
          num: 8,
          kc:10,
        },
        {
          id: 2,
          title: "good-2",
          price: 88,
          num: 8,
          kc:33,
        },
        {
          id: 3,
          title: "good-3",
          price: 99,
          num: 8,
           kc:66,
        },
      ],
    };
  },
  // 注册这些小组件
  components: {
    // 自己定义组件名：导入变量名
    cpt1,

    cpt4,
    cptt4,

    cpt5,
  },
  methods:{
    fnn(id){
      // 业务：find把符合条件成员单独挑出来，新数组！
      let i = this.list.findIndex(ele=>ele.id==id);
      this.list[i].kc--;  // 找到对应对象库存-1
    }
  }
};




</script>

<style>
</style>