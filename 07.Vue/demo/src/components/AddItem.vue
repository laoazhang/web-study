<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: {{$store.state.count}}</p>
      <button @click="addfn">库存+5</button>
  </div>
</template>

<script>
export default {
    methods:{
        addfn(){
            this.$store.commit("add",5)
        }
    }

}
</script>