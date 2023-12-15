<template>
  <div>
    <h1>操作类名</h1>

    <!-- *********************对象用法 多！！-->
    <!-- 'aa' 'bb':已经定义好的类名！ -->
    <!--  key1，key2：值Boolean值，决定前面类名要不要！ -->
    <div class="box" :class="{'aa':key1,'bb':key2}"></div>
    
    <button @click="key1=!key1">切换aa类名</button>
    <button @click="key2=!key2">切换bb类名</button>


    <!-- *********************数组用法： -->
    <!-- arr:变量，值是个数组 -->
    <!--     把数组里面成员（类名），全部一次性给了当前盒子！ -->
    <div class="box" :class="arr"></div>
    <button @click="arr=['aa','bb','cc']">添加类名</button>


  </div>
</template>

<script>
export default {
  data(){
    return {
      key1:true,
      key2:false,
      arr:[],
    }
  }
}
</script>

<style>
  .box {
    width: 200px;
    height: 200px;
    border: 1px solid #000;
  }

  .aa {
    background-color: pink;
  }

  .bb {
    box-shadow: 0 0 10px #000;
  }
</style>