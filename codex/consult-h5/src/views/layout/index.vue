<template>
  <div class="layout-page">
    <!-- 上部：显示子路由页面 -->
    <router-view />
    <!-- 底部：tabBar组件
    route 开启路由模式
    -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        首页
        <!-- 作用域插槽 
          1. 自定义图标
          2. active获取当前菜单是否选中: true 选中(显示index-active.svg) ｜ false 未选中(显示index-default.svg)
        -->
        <template #icon="{ active }">
          <cp-icon :name="`home-index-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        健康百科
        <template #icon="{ active }">
          <cp-icon :name="`home-article-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        消息中心
        <template #icon="{ active }">
          <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
        <template #icon="{ active }">
          <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// 自定义tabBar样式
::v-deep() {
  .van-tabbar-item__icon {
    font-size: 18px;
  }
  .van-tabbar-item__text {
    font-size: 14px;
  }
}
</style>
