<template>
  <div>
    <h1>获取事件对象</h1>
    <a @click="fn" href="http://www.baidu.com">百度</a><br>
    <!-- 问题：又要传实参、又要拿事件对象！ -->
    <div @click="fnn(10,$event)" href="http://www.baidu.com">百度2</div><br>
  </div>
</template>

<script>
export default {
  methods:{
    fn(e){
      // 执行函数，没有传任何实参！此时形参：打印的就是事件对象
      // console.log(e);
      e.preventDefault(); //阻止默认行为
    },
    fnn(a,e){
      // 形参：拿实参！还要拿事件对象！
      //      多个值，形参个数也是个? a,b
      //      实参：值，事件对象必须是$event
      console.log(a,e);

    }
  }
}

// 小结：事件执行函数  
//   1、@事件 = "执行少量代码"
//   2、@事件 = "函数名"                methods:{函数名}
//   3、@事件 = "函数名(实参)"          methods:{函数名(形参){}}
//      @事件 = "函数名"               methods:{函数名(形参拿了e事件对象){}}
//   4、@事件 = "函数名(实参,$event)"   methods:{函数名(形参,e){}}
</script>

<style>

</style>