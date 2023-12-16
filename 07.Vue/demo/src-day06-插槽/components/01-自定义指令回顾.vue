<template>
  <div>
    <h1 v-color="aaa" v-fontsize="c">全局与局部</h1>
    <h1 v-color="bbb">全局与局部</h1>
    <button @click="aaa=bbb='pink'">变pink</button>

  </div>
</template>

<script>
export default {
  data(){
    return {
      aaa:"yellow",
      bbb:"green",
      c:80,
    }
  },
  directives:{
    fontsize(el,binding){
      el.style.fontSize = binding.value+"px";
    }
  }
}
</script>

<style>

</style>