<template>
  <div>
    <!-- <p>具名：多处传入不同结构</p>
    <p>作用域：父级在传入结构的时候，想用子组件内部数据！</p> -->

    <p>
      <slot name="t" :row="obj">标题</slot>
    </p>
    <hr>
    <p>
      <slot name="c" :row="obj">内容</slot>
    </p>

  </div>
</template>

<script>
export default {
  data(){
    return {
      obj:{
        title:"内内内内内内内内内内内内内内内内内内数据",
        content:"我是一段内内内内内内内内内内内内内内内内内内文字"
      }
    }
  }
}
</script>

<style>

</style>