<template>
  <div>
    <!-- 作用域插槽 -->
    <!--   1、一个个键值对向外暴露，写法很麻烦，name属性特别注意！ -->
    <!--    我们学习： -->
    <!--     暴露： {  obj:{ 三个键值对 } } -->
    <!--     获取： v-slot="getSon"   -->
    <!--     应用： {{getSon.obj.属性名}} -->

    <!--   elementUI：意义！ -->
    <!--     暴露： { row行: {三个键值对}    } -->
    <!--     获取： v-slot="scope" -->
    <!--     应用： {{scope.row.属性名}}-->
    <slot :row="obj">
      {{obj.name}} -- {{obj.age}} -- {{obj.sex}}
    </slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      obj:{
        name:"zs",
        age:18,
        sex:"男"
      },
    }
  }
}
</script>

<style>

</style>