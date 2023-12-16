<template>
  <div class="article-page">


    <div class="article-item" v-for="item in list" :key="item.id" @click="go(item.id)">
      <div class="head">
        <img :src="item.creatorAvatar" alt="" />
        <div class="con">
          <p class="title">{{item.stem}}</p>
          <p class="other">{{ item.creatorName }} | {{ item.createdAt }}</p>
        </div>
      </div>
      <div class="body">{{item.content}}</div>
      <div class="foot">点赞 {{ item.likeCount }} | 浏览 {{ item.views }}</div>
    </div>

    


  </div>
</template>

<script>
import axios from "axios"  
// from:
//     1、 名字：axios 先从node_modules文件夹下 找axios文件夹；
//     2、 如果上面找不到 ./axios 当前vue同级目录下找axios（文件夹/index.vue） axios.vue  axios.js
//     3、 报错！  Can't resolve 'xxx'
export default {
  data(){
    return {
      list:[],
    }
  },
  // 调用一次！
  async created(){
    // npm i axios;
    // async await：用同步代码方式 写异步！没有出现回调函数
    let {data} =  await axios({url:"https://mock.boxuegu.com/mock/3083/articles"})
    this.list = data.result.rows;
  },
  // 
  methods:{
    go(id){
      this.$router.push({
        // 为了后期传参，专题
        name:"detail",
        // 传参
        params:{
          id,
        }
      })
    }
  }
}
</script>



<style lang="less" scoped>
.article-page {
  background: #f5f5f5;
}
.article-item {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px 15px;
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 15px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
