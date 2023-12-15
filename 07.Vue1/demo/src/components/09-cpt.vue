<template>
  <div>
    <p>
      这是个标题  <button @click="key=!key">{{key?'折叠':'展开'}}</button>
    </p>
    <div v-show="key">
      
      <!-- 所谓的形参：slot形参占了个位置，看实参给你传个什么结构 -->
      <slot></slot>

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