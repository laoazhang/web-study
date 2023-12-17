<template>
  <div id="app">

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <!-- 双标签、单标签 -->
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async created () {
    // const res = await axios.post('/user/register', {
    //   username: 'shuaipeng',
    //   password: '123456'
    // })
    const res = await axios.post('/user/login', {
      username: 'shuaipeng',
      password: '123456'
    })
    console.log(res)
  }
}
</script>

<style lang="less">

</style>
