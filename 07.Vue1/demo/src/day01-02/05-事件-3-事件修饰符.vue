<template>
  <div>
    <h1>事件修饰符</h1>
    <!-- 事件后面加修饰符 .prevent 阻止默认行为  .stop阻止冒泡-->
    <a href="http://www.itcast.cn" @click.prevent="fn">黑马程序员</a>

    <!-- .stop阻止冒泡： -->
    <!--     事件委托实现原理：事件默认在冒泡阶段执行！-->
    <!--           好处：节省内存！给动态元素进行绑定事件 -->
    <!--           缺点：多个子元素执行逻辑不一样，写在一个函数内部！每次执行起来费劲！浪费性能！-->

    <!--     两个盒子：父子盒子，儿子注册点击事件、父级也是一样！  -->
    <!--              1、点击儿子，看父亲是否跟着执行？ -->
    <!--              2、解决：给儿子设置阻止冒泡 @click.stop-->

    <div class="father" @click="fn1">
      <div class="son" @click.stop="fn2"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fn(e) {
      console.log(e);
    },
    fn1() {
      console.log("父亲");
    },
    fn2() {
      console.log("儿子");
    },
  },
};
</script>

<style>
.father {
  width: 400px;
  height: 400px;
  background-color: #ccc;
}
.son {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>