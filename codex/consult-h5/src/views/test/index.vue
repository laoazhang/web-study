<template>
  <div>
    <h1 class="test">测试页面</h1>

    <!-- 语法糖写法 -->
    <Son v-model="count" v-model:show="show"></Son>

    <!-- 2.完整写法
    $event:
      1. 如果是原生js事件，它的值是 => 事件对象
      2. 如果是组件的自定义事件，它的值是 => 子传父的data
    -->
    <!-- <Son :model-value="count" @update:model-value="count = $event"></Son> -->
    <!-- <Son
      :model-value="count"
      @update:model-value="changeCount"
      :show="show"
      @update:show="show = $event"
    ></Son> -->

    <hr />
    <p class="cp-use" style="font-size: 18px">我是p元素</p>
    <img src="@/icons/consult/alipay.svg" alt="" />

    <svg aria-hidden="true">
      <!-- #icon-文件夹名称-图片名称 -->
      <use href="#icon-login-eye-off" />
    </svg>
    <hr />
    <cp-icon name="home-docs"></cp-icon>
    <cp-icon name="consult-alipay"></cp-icon>
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

// 导入子组件
import Son from '@/views/test/son.vue'
import { ref } from 'vue'
/**
 * vue3的v-model语法糖
 * 背景：父子通信，父传子的变量，因为遵循单向数据流，父传子的变量，只能通过子传父自定义事件，去修改父组件中的变量 => 使用上有点麻烦
 * 解决：可以用v-model语法糖解决子改父麻烦的问题
 * v-model绑定父的变量
 * 1. 父的变量变化 => 子变化
 * 2. 子变化 => 父的变量变化
 * 原理：
 * v-model === :modelValue + @update:model-value="count = $event"
 * v-model:属性名 === :属性名 + @update:属性名 (多个) => .sync的变种
 * 说明：vue3元素身上可以写多个v-model
 */

const count = ref(1)
const show = ref(true)

const changeCount = (data: number) => {
  count.value = data
}

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
  border: var(--cp-div-bd);
}
</style>
