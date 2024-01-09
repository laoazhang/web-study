<script setup lang="ts">
import { userInfo } from '@/api/user'
import { useUserStore } from '@/stores'
import type { UserInfo } from '@/types/user'
import { showConfirmDialog, showSuccessToast } from 'vant'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 一、获取用户数据渲染展示
// 1. 响应变量存储用户数据
const userData = ref({} as UserInfo)

// 2. 获取用户数据
const getUserInfo = async () => {
  const { data } = await userInfo()
  userData.value = data
  // console.log(data)
}

// 3. 组件挂载
onMounted(() => {
  getUserInfo()
})
// 二、获取快捷工具
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
// 三、退出登录
const store = useUserStore()
// 说明：use开头的钩子函数，只能在setup中使用
const router = useRouter()
const logout = () => {
  /**
   * 1. 用户确认
   * 2. 点击确定，执行退出：
   *    1. 调用退出登录api接口（没有）
   *    2. 删除pinia用户信息
   *    3. 跳回登录页
   */
  showConfirmDialog({
    title: '提示',
    message: '确认退出在线问诊吗？'
  })
    .then(() => {
      // 确定
      store.delUser()
      showSuccessToast('退出成功')
      router.push('/login')
    })
    .catch(() => {
      // 取消
    })
}
</script>

<template>
  <div class="user-page">
    <!-- 1. 头部展示 -->
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="userData.avatar" />
        <div class="name">
          <p>{{ userData.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userData.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ userData.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row v-if="userData.orderInfo">
        <van-col span="6">
          <cp-icon name="user-paid" />
          <p>待付款:{{ userData.orderInfo.paidNumber }}</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-shipped" />
          <p>待发货:{{ userData.orderInfo.receivedNumber }}</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-received" />
          <p>待收货:{{ userData.orderInfo.shippedNumber }}</p>
        </van-col>
        <van-col span="6">
          <cp-icon name="user-finished" />
          <p>已完成:{{ userData.orderInfo.finishedNumber }}</p>
        </van-col>
      </van-row>
    </div>
    <!-- 2. 快捷工具 -->
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <!-- is-link 开启链接 -->
      <van-cell
        v-for="(tool, i) in tools"
        :key="i"
        :title="tool.label"
        is-link
        :to="tool.path"
        :border="false"
      >
        <template #icon><cp-icon :name="`user-tool-0${i + 1}`" /></template>
      </van-cell>
      <van-cell title="标题" is-link :border="false">
        <template #icon><cp-icon name="user-tool-01" /></template>
      </van-cell>
    </div>
    <!-- 3. 退出登录 -->
    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 10px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
