<template>
  <div>
    <h1>v-for</h1>

    <button @click="add">新增一个成员</button>
 
    <ul>
      <li v-for="(item,index) in list" :key="index">
        姓名：{{item.name}}     年龄：{{item.age}}
      </li>
    </ul>

    <hr>

    <ul>
      <!-- 不用下标 i没有用 -->
      <li v-for="item in list" :key="item.id">
        姓名：{{item.name}}     年龄：{{item.age}}
      </li>
    </ul>

    <!-- 就地复用： -->
    <!--      数据变了，页面dom节点不是全部干掉！再生成全新dom节点！杀了重来！ -->
    <!--      数据变了，页面dom节点留下来，更新为新的dom节点！ -->

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
  },
  methods:{
    add(){
      // 往list内部添加一个新的成员!
      let one = {
        // id: 模拟后台数据，id为了数据与数据之间区分！不一定非得是整数！
        id: Math.random(),
        name:"新来的",
        age:19
      };
      // 添加到数组 第二位置  操作的下标，删除个数
      this.list.splice(1,0,one);
    }
  }

}
</script>

<style>
li {
    background-color: #ccc;
    font-size: 30px;
  }

</style>