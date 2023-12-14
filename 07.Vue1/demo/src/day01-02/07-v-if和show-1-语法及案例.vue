<template>
  <div>
    <p>v-show v-if</p>
    <p>v-show="变量" 变量:true 展示 控制盒子显示隐藏</p>
    <p>v-if="变量" 变量:true 展示 控制盒子创建删除</p>
    <!-- 注意：某些业务，频繁操作某个盒子显示隐藏！最好用v-show性能更好一些！ -->

    <!-- 需求：有个按钮控制下，点击按钮，隐藏！ 再次点击，又出现！-->
    <!--      1、注册点击事件 -->
    <!--      2、控制显示隐藏：盒子，被谁控制 key! -->
    <!--      3、点击后只要控制了key，控制了盒子的显示隐藏！ -->
    <!--          key: true  || false  取反！-->

    <!-- 需求2：文字也改？ 当有盒子：显示折叠！当没有盒子：显示展开！-->
    <!--      1、文字需要被盒子的状态控制 -->
    <!--      2、盒子的状态：key -->
    <!--         key?'折叠':'展开' -->
    <button @click="key = !key">{{ key ? "折叠" : "展开" }}</button>
    <div class="box" v-show="key"></div>
    <div class="box" v-if="key"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: true,
    };
  },
};
</script>
 
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  margin: 5px;
}
</style>