<template>
  <div>
      <h3>SubItem组件</h3>
      <p>已知库存数: {{count}}</p>
      <button @click="sub(8)">库存-8</button>
  </div>
</template>

<script>
// 1、辅助函数
import { mapState,mapMutations } from 'vuex'
// 2、基本使用
// let res = mapState(['count'])
// let res = mapMutations(['add','sub'])

export default {
    data(){
        return{
            //data函数，在页面初始化执行只会执行一次
            // count:this.$store.state.count 
        }
    },
    //被计算属性
    computed:{
        //计算属性名称(){return 去计算该属性一些数据}
        // count(){
        //     return this.$store.state.count
        // }

        // ...mapState(['count','num']),
        // ...mapState({hm_count:'count',hm_num:'num'}),
        count: {
            get(){
                return this.$store.state.count;
            },
            set(val){
                this.$store.commit("reset",val)
            }
        }
    },
    methods:{
        ...mapMutations(['sub'])
    }

}
</script>