<template>
  <div>
    <!-- <p>封装特别函数：组件（三块结构）</p> -->
    <div class="box">
      <h3>标题 <button @click="show=!show">{{show?'折叠':'展开'}}</button></h3>
      <ul v-show="show">
        <li>xxxxxxxxxxxxxx</li>
        <li>xxxxxxxxxxxxxx</li>
        <li>xxxxxxxxxxxxxx</li>
        <li>xxxxxxxxxxxxxx</li>
      </ul>

      <cpt2></cpt2>
    </div>


  </div>
</template>

<script>
export default {
  data(){
    return {
      show:true,
    }
  }
}
</script>

<style>
  .box {
    border: 1px solid #000;
  }
</style>