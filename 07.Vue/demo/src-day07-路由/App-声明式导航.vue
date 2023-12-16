<template>
  <div>
    <div class="footer_wrap">
      <!-- 路由：切换样式 a标签和以前去做tab样式切换 一样！ -->
      <!-- <a href="#/find" :class='{actived: 条件}' @click="麻烦">发现音乐</a>
      <a href="#/my">我的音乐</a>
      <a href="#/friend">朋友</a> -->

      <!-- router提供： -->
      <!--     1、to后面不需要写# -->
      <!--     2、router-link被渲染为a标签 -->
      <!--     3、自带类名 router-link-exact-active router-link-active   -->
      <!--         了解 router-link-exact-active：精确匹配 路由地址必须是/find 才会加上-->
      <!--              router-link-active： 模糊匹配  只要路由地址 在配置规则内-->
      <router-link to="/find">发现音乐</router-link>
      <router-link to="/my">我的音乐</router-link>
      <!-- <router-link to="/friend">朋友</router-link> -->

      <!-- 需求：路由去某个组件内，给组件传入值！ -->
      <!--      方式1： -->
      <!--          1、传入某个数据 /路径?name=小传 -->
      <!--          2、组件内应该获取传入数据！ $route.query ===>  {name:"小传"}-->
      <router-link to="/friend?name=小传">朋友-小传</router-link>

      <!--      方式2： -->
      <!--          1、传入某个数据 /friend/可变 新的路由地址 -->
      <!--          2、绝对不是把所有可变地址全部配置！路由规则：可变路径 /friend/:name -->
      <!--             name变量名字随便起， name可以获取到/friend/可变  可变这个部分！-->
      <!--          3、组件内部要拿这个可变数据  $route.params  -->
      <router-link to="/friend/小智">朋友-小智</router-link>

      


    </div>
    <div class="top">
      <!-- router提供组件：专门展示对应组件  -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
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
.footer_wrap a {
  flex: 1;
  text-decoration: none;
  padding: 20px 0;
  line-height: 20px;
  background-color: #333;
  color: #ccc;
  border: 1px solid black;
}
.footer_wrap a:hover {
  background-color: #555;
}
.top {
  padding-top: 62px;
}
</style>