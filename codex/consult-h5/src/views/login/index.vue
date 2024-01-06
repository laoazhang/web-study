<script setup lang="ts">
import { ref } from 'vue'
// 导入校验规则
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { showFailToast, showSuccessToast, type FormInstance, formProps } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/api/user'
// 导入用户store
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { onUnmounted } from 'vue'

const clickRight = () => {
  console.log('点击了右边的文字')
}
// 是否同意网站使用协议
const agree = ref(false)

/**
 * 动态切换密码框眼睛图标，控制是否显示密码
 * 1. 定义一个响应变量isShowPass
 * 2. 根据isShowPass控制是否显示密码
 */
const isShowPass = ref(false)

// 切换短信登录
const isPass = ref(true)

//准备账号密码响应变量
const mobile = ref('13230000001')
const password = ref('abc12345')
const code = ref('')
// 点击登录
// pinia持久化
const store = useUserStore()
// 跳转页面使用
const router = useRouter()
// 获取路由参数
const route = useRoute()
const login = async () => {
  // console.log('校验通过了')
  if (!agree.value) return showFailToast('请勾选用户协议')
  // 验证完毕，进行登录
  try {
    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await loginByMobile(mobile.value, code.value)
    store.setUser(res.data)
    // 说明：存在route.query.returnUrl 回跳地址=> 跳转teturnUrl地址
    // 相反，默认跳转用户个人中心
    router.push((route.query.returnUrl as string) || '/user')
    showSuccessToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}

const time = ref(0)
const form = ref<FormInstance>()
let timeId: number
const send = async () => {
  // 已经倒计时time的值大于0，60s内不能重复发送验证码
  if (time.value > 0) return
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('mobile')
  const res = await sendMobileCode(mobile.value, 'login')
  showSuccessToast('发送成功')
  code.value = res.data.code
  time.value = 60
  // 倒计时
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}
onUnmounted(() => {
  window.clearInterval(timeId)
})
</script>

<template>
  <div>
    <cp-nav-bar title="登录" rightText="注册" @click-right="clickRight"></cp-nav-bar>
    <div class="login">
      <!-- 1. 头部 -->
      <div class="login-head">
        <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
        <a href="javascript:;" @click="isPass = !isPass">
          <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
          <van-icon name="arrow"></van-icon>
        </a>
      </div>
      <!-- == 2. form 表单 == -->
      <van-form @submit="login" autocomplete="off">
        <!-- 1. 手机号输入框 -->
        <van-field
          v-model="mobile"
          name="mobile"
          :rules="mobileRules"
          placeholder="请输入手机号"
          type="tel"
        ></van-field>
        <!-- 2. 密码输入框 -->
        <van-field
          v-if="isPass"
          v-model="password"
          :rules="passwordRules"
          placeholder="请输入密码"
          :type="isShowPass ? 'text' : 'password'"
        >
          <template #button>
            <cp-icon
              @click="isShowPass = !isShowPass"
              :name="`login-eye-${isShowPass ? 'on' : 'off'}`"
            ></cp-icon>
          </template>
        </van-field>
        <van-field v-else v-model="code" placeholder="短信验证码" :rules="codeRules">
          <template #button>
            <span @click="send">{{ time > 0 ? `${time}后再次发送` : '发送验证码' }}</span>
          </template>
        </van-field>
        <div class="cp-cell">
          <van-checkbox v-model="agree">
            <span>我已同意</span>
            <a href="javascript:;">用户协议</a>
            <span>及</span>
            <a href="javascript:;">隐私条款</a>
          </van-checkbox>
        </div>
        <div class="cp-cell">
          <van-button block round type="primary" native-type="submit">登 录</van-button>
        </div>
        <div class="cp-cell">
          <a href="javascript:;">忘记密码？</a>
        </div>
      </van-form>
      <!-- ... -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  padding-top: 46px;
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  .van-form {
    padding: 0 14px;
    .cp-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
