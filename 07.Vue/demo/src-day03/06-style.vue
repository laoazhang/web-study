<template>
  <div>
    <h1>样式操作</h1>

    <!-- *********************对象用法 多!!!-->
    <!-- width：css属性名 -->
    <!-- w: 要设置属性值！ -->
    <div class="box" :style="{'width':w,'background-color':bgc}"></div>
    


    <!-- *********************数组用法： -->
    <!-- 里面成员项：对象（CSS属性设置键值对！） -->
    <div class="box" :style="arr"></div>


  </div>
</template>

<script>
export default {
  data(){
    return {
      w:"300px",
      bgc:"#ccc",
      arr:[
        {
          width:"400px",
          backgroundColor:"green"
        },
        {
          height:"100px",
        },
      ]
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