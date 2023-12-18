<template>
  <div id="app">
    <h1>根组件</h1>
    <span>库存总数:</span> <input type="text" v-model.number="count">

    

    <button @click="get">（用法1）获取服务器上数据</button>  
    <button @click="getServer">（用法2-同名）获取服务器上数据</button>  
    <button @click="hm_get">（用法2-改名）获取服务器上数据</button>  




    <div style="border:1px solid black; width: 300px;">
      <AddItem></AddItem>
    </div>

    <hr>

    <div style="border:1px solid black; width: 300px;">
      <SubItem></SubItem>
    </div>


    <h3>总价：{{ $store.getters['goods/all'] }} （用法1 直接用）</h3>
    <h3>总价：{{ my_all }} （用法1 自己改名字）</h3>

    <h3>总价：{{ all }} （用法2 同名）</h3>
    <h3>总价：{{ hm_all }} （用法2 改名）</h3>


    
  </div>
</template>

<script>
import AddItem from '@/components/AddItem'
import SubItem from '@/components/SubItem'
import { mapState,mapActions,mapGetters } from 'vuex'



export default {
  components: {
    AddItem,
    SubItem
  },
  computed:{
    // <input type="text" v-model="count">
    //     1、...mapState(['count'])  count计算属性简单写法! 被算计！
    //     2、页面中v-model 要求count是数据双向绑定，要求count能被算，也能算别人！要求计算完整写法！
    
    // 没有办法：自己完成计算属性的完整写法！
    count:{
      get(){
        return this.$store.state.goods.count;  // 只能手动写用法1，
      },
      set(val){
        this.$store.commit("goods/reset",val)  // 只能写用法1,把val值设置给count
      }
    },

    // 记忆：页面中某个数据来自于vuex！在v-model双向绑定，一定是用法1！自己写计算属性完整写法！,

    my_all(){
      return this.$store.getters['goods/all'];
    },
    // 用法2：
    ...mapGetters('goods',['all']),
    ...mapGetters('goods',{hm_all:'all'}),

  },
  methods:{
    // 用法1：自己起名字，自己写函数
    get(){
      this.$store.dispatch("goods/getServer");
    },

    // 用法2:
    ...mapActions('goods',['getServer']), 
    ...mapActions('goods',{hm_get:'getServer'}),
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