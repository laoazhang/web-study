<template>
  <div>
    
    <p>
      <slot name="title"></slot>
      <button @click="key=!key">{{key?'折叠':'展开'}}</button>
    </p>
    <div v-show="key">
      
      <!-- 所谓的形参：slot形参占了个位置，看实参给你传个什么结构 -->
      <slot name="content">默认值</slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      key:true,
    }
  }
}
</script>

<style>

</style>