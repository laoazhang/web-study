<template>
  <div>
    <div class="footer_wrap">
      
      <!-- <span @click="goto('/find')">发现音乐</span>
      <span @click="goto('/my')">我的音乐</span>
      <span @click="goto('/friend')">朋友</span> -->


      <span @click="go('a')">发现音乐</span>
      <span @click="go('b')">我的音乐</span>
      <!-- <span @click="go('c')">朋友</span> -->


      <span @click="fn1">朋友-小小传</span>
      <span @click="fn2">朋友-小小智</span>

    </div>
    <div class="top">
      <!-- router提供组件：专门展示对应组件  -->
      <router-view></router-view>
    </div>


  </div>
</template>

<script>
export default {
  methods:{
    goto(path){

      // JS代码 进行转跳
      this.$router.push({
        path: path,  // 路由规则定义好路由地址
      });

    },
    go(name){
      this.$router.push({
        name:name
      });
    },

    fn1(){
      // 方式：  /friend?name=小传   
      this.$router.push({
        // 去哪？
        name:"c",  // /friend路由地址
        // 参数单词记忆  与 获取：this.$route.query
        query:{
          name:"小小传"
        }
      });
    },
    fn2(){
      // 形式：  /friend/可变字
      this.$router.push({
        name:"d",  // 去/friend/:name
        // 参数:
        params:{
          name:"小小智"  // name属性名不能随意写，依据可变路由里面变量名
        },
      })
    }
  }
};
</script>

<style scoped>
.router-link-active {
  background-color: blue!important;
}


.footer_wrap {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #ccc;
}
.footer_wrap a,.footer_wrap span {
  flex: 1;
  text-decoration: none;
  padding: 20px 0;
  line-height: 20px;
  background-color: #333;
  color: #ccc;
  border: 1px solid black;
}
.footer_wrap a:hover,.footer_wrap span:hover {
  background-color: #555;
}
.top {
  padding-top: 62px;
}
</style>