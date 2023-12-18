<template>
  <div>
      <h3>SubItem组件</h3>


      <!-- $store.state.count太长了，换个名字 -->
      <!-- <p>已知库存数: {{$store.state.count}}</p> -->

      <p>已知库存数(同名): {{count}}</p>
      <p>已知库存数(改名): {{hm_count}}</p>

      <button @click="sub(8)">(同名方法)库存-8</button>
      <button @click="hm_sub(8)">(改名方法)库存-8</button>
  </div>
</template>

<script>
// 1、导入辅助函数mapState
import { mapMutations, mapState } from 'vuex'

// **************************************************************************mapMutations
// ******************************************基本使用
// let res = mapMutations(['add','sub']);


// console.log(res); 不需要大家自己写函数！
//   {add: ƒ, sub: ƒ}  相当于
//   {
//      add(参数){  this.$store.commit("add",参数传入的值)  },
//      sub(参数){  this.$store.commit("sub",参数传入的值)  }
//   }


// methods:{
//   ...res
// }

// *****************************************参数格式
// mapMutations(['add','sub']);  同名方法直接拿过来使用
// mapMutations({hm_add:"add",hm_sub:"sub"});  // 改名字自己定义

//   {
//      hm_add(参数){  this.$store.commit("add",参数传入的值)  },
//      hm_sub(参数){  this.$store.commit("sub",参数传入的值)  }
//   }









// **************************************************************************state
// ******************************************基本使用
// let res = mapState(['count'])

// console.log(res) 看res到底是个啥
//    {count:函数}  相当于： 计算属性简单写法！！
//    {  count(){ return this.$store.state.count  }  }

// computed:{    对res对象展开
//     ...res
// }

// *****************************************参数格式
// []：把vuex数据同名直接拿过来！
// let res = mapState(['count','num'])
// console.log(res);

// {} 组件内部：已经有了count、num变量名！
//    被改后的新名字：原来名字
// let res = mapState({hm_count:'count',hm_num:'num'})
// console.log(res);






export default {
  data(){
    return {
      // 了解：data函数，在页面初始化执行只会执行一次！
      // 需求：后面数据变，导致前面的数据也会跟着变！
      // count:this.$store.state.count  
    }
  },
  
  computed:{
    // 用法2过渡写法：改名字 计算简单写法
    // count(){
    //   return this.$store.state.count
    // }

    ...mapState(['count','num']),
    ...mapState({hm_count:'count',hm_num:'num'}),
  },
  methods:{
    ...mapMutations(['sub']),
    ...mapMutations({hm_sub:'sub'})
  }
}



</script>