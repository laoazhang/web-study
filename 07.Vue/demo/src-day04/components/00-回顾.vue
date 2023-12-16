<template>
  <div>
    <p>
      计算属性：【！什么情况下用！】
           1、简单写法：当发现某个数据的值，需要被别的数据计算出，统计出来！（被计算）
           2、完整写法：用户可以点击该处，使视图发生改变，让数据也跟着发生改变，其他地方也变！（去算计别人）
           
           完整写法计算属性名在视图中使用：v-model="计算属性名"
           computed:{
             计算属性名:{
                get(){   
                  return 被算计的值;
                },
                set(val){
                  val要算计别人的值，写JS业务！ 
                }
             }
           }
      


      侦听器：当对某些数据要进行 监视！（数据本地化）
           1、简单写法：用于监听简单数据类型
           watch:{
             data和computed属性名(){
               数据变化后执行业务代码！
             }
           }


           2、完整写法：复杂数据类型
           watch:{
             data和computed属性名:{
               deep:true,
               handler(){
                 当被监听数据发生改变时，应该写的JS代码！
               },
               immediate:false, 是否让上面函数立马执行一次！
             }
           }

      
      样式操作：
           :class="{类名1:要不要前面类名,  ...}"
           :style="{css属性名:具体对前面css设置的值,  ...}"
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>