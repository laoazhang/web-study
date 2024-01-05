<script setup lang="ts">
import { ref } from 'vue'
// 导入校验规则
import { mobileRules, passwordRules } from '@/utils/rules'
import { showFailToast } from 'vant'

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

//准备账号密码响应变量
const mobile = ref('')
const password = ref('')
// 点击登录
const login = () => {
  console.log('校验通过了')
  if (!agree.value) return showFailToast('请勾选用户协议')
  // 进行登录
}
</script>

<template>
  <div>
    <cp-nav-bar title="登录" rightText="注册" @click-right="clickRight"></cp-nav-bar>
    <div class="login">
      <!-- 1. 头部 -->
      <div class="login-head">
        <h3>密码登录</h3>
        <a href="javascript:;">
          <span>短信验证码登录</span>
          <van-icon name="arrow"></van-icon>
        </a>
      </div>
      <!-- == 2. form 表单 == -->
      <van-form @submit="login" autocomplete="off">
        <!-- 1. 手机号输入框 -->
        <van-field
          v-model="mobile"
          :rules="mobileRules"
          placeholder="请输入手机号"
          type="tel"
        ></van-field>
        <!-- 2. 密码输入框 -->
        <van-field
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
