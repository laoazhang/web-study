<template>
  <div>
    <h1 class="test">测试页面</h1>
    <p class="cp-use" style="font-size: 18px">我是p元素</p>
    <ul>
      <li>{{ store.user }}</li>
      <li @click="changeUser">修改user</li>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </ul>
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from '@/stores/modules/user'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

// 导入封装request
import { request } from '@/utils/request'
import { onMounted } from 'vue'

const store = useUserStore()
// 点击修改用户store全局数据
const changeUser = () => {
  store.setUser({
    token: '123',
    id: '1',
    account: '234',
    mobile: '138000000',
    avatar: '123'
  })
}

const route = useRoute()
console.log('路由对象', route)

// 测试request方法
// 测试401
const getHome = async () => {
  const res = await request.get('/patient/myUser')
  console.log(res)
}
// 测试正常和异常
const login = async () => {
  const res = await request.post('/login/password', {
    mobile: '13211112222',
    // 密码 abc123456 测试：出现非10000的情况
    password: 'abc123415'
  })
  console.log('登录成功', res)
}
onMounted(() => {
  // getHome()
  login()
})
</script>

<style lang="scss" scoped>
// 1. 通过scss定义css变量 => 语法：$变量名:css变量值
// 说明： scss定义的变量最终通过sass打包成css
$fontColor: red;
$divBd: 2px solid rgb(0, 123, 255);

.test {
  color: $fontColor;
  font-size: 16px;
  border: $divBd;
}
</style>
