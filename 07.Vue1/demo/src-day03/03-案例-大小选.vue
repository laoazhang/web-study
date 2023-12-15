<template>
  <div>
    <span>全选:</span>
    <input type="checkbox" v-model="ck" />
    <!-- <button >反选</button> -->
    <ul>


      <li v-for="(item,i) in arr" :key="i">
        <!-- :checked="item.c" 单独数据绑定 -->
        <!-- v-model="item.c"  双向数据绑定-->
        <input type="checkbox"  v-model="item.c" />
        <span>{{item.name}}</span>
      </li>


    </ul>
  </div>
</template>

<script>


export default {
  // 初始化数据
  data() {
    return {
      arr: [
        {
          name: "猪八戒",
          c: true, // 该项是否选中？
        },
        {
          name: "孙悟空",
          c: false,
        },
        {
          name: "唐僧",
          c: false,
        },
        {
          name: "白龙马",
          c: false,
        },
      ],
    };
  },
  // methods: 方法

  // 计算属性：
  computed:{
  
    // 语法格式： 自定义属性名(){ 计算出某个值过程   return 结果; }
    bigCk(){
      // 四个小选---->大选值

      let key; // 大选值
      let num = 0;  // 小选选中的个数

      // 统计下小选选中的个数: 
      this.arr.forEach(item => {  // this当前组件对象
        if (item.c==true) {
          num++;  // 统计
        }
      });

      // num统计的结果
      if (num==this.arr.length) {  // 选中的个数 和 数组长度一样
        key = true;
      }else{  // 有个没有选
        key = false;  
      }

      return key;
    },



    // *******************************四个小选-------->决定大选：
    //    1、四个小选状态，都选中！大选框也要选中！否则，不能选中！
    //    2、大选框的状态，是由四个小选状态的决定！由四个小选状态计算出来的！
    //       大白话：大选框的状态 【被算计】 出来！---->计算属性 简单写法
    // <input type="checkbox" :checked="ck" />
    // ck(){
    //   // every: 判断数组每项是否符合后面条件，
    //   //         全部符合：every方法执行结果 true;
    //   //         不符合：  every方法执行结果 false;
    //   return this.arr.every(item=>item.c==true);
    // }



    // *******************************大选状态-------->四个小选
    //  用户点击大选框，把点后状态 设置给每一个小选框
    //       大白话：大选框的状态 【算计别人】     ---->计算属性 语法完整写法！
    // 自定义属性名:{   
    //   get(){  // get 被得到，被算计！
    //     return 被算计出来的值
    //   }, 
    //   set(val){  // set 要设置别人，计算别人  val就是要算计别人开始那个值！
    //    // 去算计别人代码
    //   },
    // }

    // <input type="checkbox" v-model="ck" />
    ck:{
      get(){  // ck被算计
        return this.arr.every(item=>item.c==true);
      },
      set(val){  // ck要算计别人，得让视图上有得到ck值机会：
        // 用户点击后，大选框变了，值变了，val拿到就是点击后值！
        // 算计别人：把val值设置给每一个小选框！
        this.arr.forEach(item=>item.c=val);
      }
    }


    // 小结：什么用计算属性
    //   简单写法：发现某个值，被算计出来！
    //   完整写法：除了被算计，还要算计被人！



  }

};
</script>

<style>
</style>