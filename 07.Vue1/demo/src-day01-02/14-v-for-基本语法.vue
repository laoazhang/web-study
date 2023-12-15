<template>
  <div>
    <h1>v-for</h1>
    <p>获取列表:[{id:1,name:"zs",age:18},{id:1,name:"zs",age:18}]</p>
    <p>数组：直接用v-for 循环！</p>
    <p>数组：直接用v-for 往标签上写</p>
    <p>语法：v-for="(item,index) in list"  item: 每个成员 index：下标</p>

    <ul>
      <li v-for="(item,index) in list" :key="index">
        姓名：{{item.name}}     年龄：{{item.age}}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[
        {id:1,name:"张三",age:18},
        {id:2,name:"李四",age:19},
        {id:3,name:"王五",age:20},
      ]
    }
  }

}
</script>

<style>

</style>