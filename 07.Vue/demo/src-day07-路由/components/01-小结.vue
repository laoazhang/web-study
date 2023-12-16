<template>
  <div>
    路由：
       转跳路由方式：
            1、声明式导航：a标签！  router-link to="/路径"
            2、编程式导航：js转跳   this.$router.push({    
                                    path,
                                    name,  【推荐】
                                  })
       传参：
            1、/路径?参数名=参数值    获取：$route.query.参数名
            2、/路径/可变值参数值     获取：$route.params.参数名
                      注意：新的路由地址！配置这样地址
                           /路径/:参数名
    
    重定向：redirect:"/路径"
    404： {path:"*"}
    模式： mode: "history" 后台得配置。
    二级路由特点：某个路由组件内部，又有了有新的转跳，参考layout组件！
          
                      
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>