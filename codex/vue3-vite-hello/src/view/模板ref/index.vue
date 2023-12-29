<template>
  <div>
    <h1 ref="h1">模板ref使用</h1>
    <el-form ref="son"></el-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// 导入组件=》即注册
import ElForm from "./son.vue";

/**
 * 场景一：获取模板中某个元素的dom对象
 * 步骤：
    1. 创建 ref =>  `const hRef = ref(null)`
    2. 模板中建立关联  =>  `<h1 ref="hRef">我是标题</h1>`
    3. 使用 => `hRef.value`
 */
const h1 = ref(null)
onMounted(()=>{
  console.log('组件挂在后：',h1.value);
  h1.value.style.border = '10px solid red'
})

/**
 * 场景二：获取模板中某个组件实例，调用实例方法
 * 场景说明：element的form组件,怎么做兜底校验?
 * vue2用法：
 * 1.<el-form ref="form"></el-form>
 * 2.this.$refs.form.validate()
 */
const son =ref(null)
onMounted(()=>{
  console.log('组件挂在后：',son.value);
  son.value.validate()
  console.log(son.value.zd);
})

</script>

<style lang="scss" scoped>

</style>