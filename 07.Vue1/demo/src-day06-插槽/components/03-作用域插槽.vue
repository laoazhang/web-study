<template>
  <div>
    <h2>下面这是图片</h2>
    <!-- 作用域插槽 -->
    <!--      1、内部变量，外面不能直接用-->
    <!--      2、语法： 需要把我们让外面使用变量 暴露出来！{aaa:"xxxxxx"} -->
    <!--      3、外面：拿到数据 template v-slot="getSon"  -->
    <slot :aaa="imgSrc">
      {{imgSrc}}
    </slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgSrc :"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"}
  }
}
</script>

<style>

</style>