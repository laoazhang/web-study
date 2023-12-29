<template>
  <div class="app">
    <el-table :data="list" border >
    <el-table-column prop="goods_id" label="ID" width="150" />
    <el-table-column prop="goods_name" label="商品" />
    <el-table-column prop="goods_price" label="价格" />
    <el-table-column label="操作"  width="100">
      <template v-slot="{ row }">
      <el-button type="danger" link @click="delRow(row.goods_id)">删除</el-button>
    </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'

const list = ref([])
const getList=async ()=>{
  const {data} = await axios({
    method:'get',
    url: 'https://applet-base-api-t.itheima.net/api/cart'
  })
  list.value=data.list
}

onMounted(()=>{
  getList()
})

// 删除数据
const delRow = async (id) => {
  list.value = list.value.filter(item=>item.goods_id!== id)
}

</script>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>