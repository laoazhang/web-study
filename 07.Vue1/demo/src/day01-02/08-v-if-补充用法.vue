<template>
  <div>
    <h1>v-if</h1>
    <p>if? if elseif else：分支结构，不同情况做不同的事！</p>

    <!-- 需求：随便写个分数！不同分数来留下不同的标签的的内容！ -->
    <!-- 注意：指令可以配套！标签不用配套！-->
    <p v-if="num >= 550">一本</p>
    <button v-else-if="num">二本</button>
    <div v-if="num >= 300">三本</div>
    <h3>重读</h3>

    <p v-if="num >= 550">一本</p>
    <button v-else-if="num >= 400">二本</button>
    <div v-else-if="num >= 300">三本</div>
    <h3 v-else>重读</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 730,
    };
  },
};
</script>

<style>
</style>