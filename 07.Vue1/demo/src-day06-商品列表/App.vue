<template>
  <div class="table-case">

    <!-- 为什么？ -->
    <MyTable :goods="goods">
      <template #title>
        <th>大编号</th>
        <th>大图片</th>
        <th>大名称</th>
        <th width="100px">大标签</th>
      </template>
      
      <template #content="scope">  

        <td>{{scope.row.id}}</td>
        <td>
          <img
            :src="scope.row.picture"
          />
        </td>
        <td>{{scope.row.name}}</td>
        <td>
          <!-- 结构：原来删除！下面样式删除！ -->
          <!-- <MyTag :value="msg" @input="ccc"></MyTag> -->

          <!-- 设计：专门大家熟悉 v-model语法糖 -->
          <MyTag v-model="scope.row.tag"></MyTag>
        </td>

      </template>
    </MyTable>

  </div>
</template>

<script>
import MyTag from "./components/MyTag.vue"
import MyTable from "./components/MyTable.vue"
export default {
  name: 'TableCase',
  data () {
    return {
      goods: [
        { id: 101, picture: 'https://yanxuan-item.nosdn.127.net/f8c37ffa41ab1eb84bff499e1f6acfc7.jpg', name: '梨皮朱泥三绝清代小品壶经典款紫砂壶', tag: '茶具' },
        { id: 102, picture: 'https://yanxuan-item.nosdn.127.net/221317c85274a188174352474b859d7b.jpg', name: '全防水HABU旋钮牛皮户外徒步鞋山宁泰抗菌', tag: '男鞋' },
        { id: 103, picture: 'https://yanxuan-item.nosdn.127.net/cd4b840751ef4f7505c85004f0bebcb5.png', name: '毛茸茸小熊出没，儿童羊羔绒背心73-90cm', tag: '儿童服饰' },
        { id: 104, picture: 'https://yanxuan-item.nosdn.127.net/56eb25a38d7a630e76a608a9360eec6b.jpg', name: '基础百搭，儿童套头针织毛衣1-9岁', tag: '儿童服饰' },
      ],
      // msg:"茶叶"
    }
  },
  components:{
    MyTag,
    MyTable,
  },
  methods:{
    // ccc(val){
    //   this.msg = val;
    // }
  }
}
</script>

<style lang="less" scoped>
.table-case {
  width: 1000px;
  margin: 50px auto;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    vertical-align: middle;
  }
}




</style>
