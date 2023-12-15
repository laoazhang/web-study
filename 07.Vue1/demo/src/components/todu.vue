<template>
  <li :class="{completed:item.isDone}">
              <div class="view">
                  <input class="toggle" type="checkbox" v-model="item.isDone">
                  <label>{{item.name}}</label>
                  <button class="destroy" @click="del"></button>
              </div>
          </li>
</template>

<script>
export default {
    props:["item"],
    methods:{
        del(){
            // 通知父级删除当前这个对象数据
            this.$emit("aaa",this.item.id)
        }
    }
}
</script>

<style>

</style>