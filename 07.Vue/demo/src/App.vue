<template>
  <div id="app">
    <h1>根组件</h1>
    <span>库存总数:</span>
    <input type="text">
    <div style="border:1px solid black; width: 300px;">
      <AddItem></AddItem>
    </div>
    <hr>
    <div style="border:1px solid black; width: 300px;">
      <SubItem></SubItem>
    </div>
  </div>
</template>

<script>
import AddItem from '@/components/AddItem'
import SubItem from '@/components/SubItem'
export default {
  components: {
    AddItem,
    SubItem
  }
}
</script>

<style>
#app {
  width: 300px;
  margin: 20px auto;
  border:1px solid #ccc;
  padding:4px;
}
</style>