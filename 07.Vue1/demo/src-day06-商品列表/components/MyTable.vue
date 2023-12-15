<template>
  <table class="my-table">
    <thead>
      <tr>
        <!-- 头部允许外面传入结构 -->
        <slot name="title"></slot>
      </tr>
    </thead>

    <tbody>


      <tr v-for="item in goods" :key="item.id">
        <!-- 列表内每行：允许外面传入结构 -->
        <!--      {row:item对象} -->
        <slot name="content" :row="item"></slot>
      </tr>


    </tbody>
  </table>
</template>

<script>
export default {
  props:{
    goods:{ // 详细要求
      type:Array,
      default:[],
    }
  }
};
</script>

<style lang="less" scoped>
.my-table {
  width: 100%;
  border-spacing: 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    vertical-align: middle;
  }
  th {
    background: #f5f5f5;
    border-bottom: 2px solid #069;
  }
  td {
    border-bottom: 1px dashed #ccc;
  }
  td,
  th {
    text-align: center;
    padding: 10px;
    transition: all .5s;
    &.red {
      color: red;
    }
  }
  .none {
    height: 100px;
    line-height: 100px;
    color: #999;
  }
}
</style>