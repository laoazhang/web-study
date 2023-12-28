<template>
  <div>
    <h1>ref函数使用</h1>
    <ul>
      <li v-show="isShow">控制元素是否显示</li>
      <li>
        <button @click="isShow=!isShow">修改变量</button>
      </li>
      <li>{{ count }}</li>
      <li>{{ list }}</li>
      <li>{{ obj }}</li>
      <li></li>      
    </ul>
    <hr>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <p><button @click="changeVar">修改</button></p>
  </div>
</template>
<!-- 
<script>
import { ref } from "vue";
export default {
  
  setup () {
    /**
   * 使用步骤：
      - 从 `vue` 中导入 `ref` 函数
      - 在 `setup` 函数中，使用 `ref` 函数，传入普通数据（简单or复杂），返回一个响应式数据
      - 最后 `setup` 函数返回一个对象，包含该响应式数据即可
      - 注意：使用 `ref` 创建的数据，`js` 中需要 `.value` ，`template` 中可省略
   */
  // 1.语法：const 变量名 = ref(任意类型默认值)
  // 简单类型
  const isShow = ref(true)
  const count = ref(1)

  // 复杂类型
  const list =ref([1,2,5])
  const obj = ref({a:1,b:'hi'})

  const changeVar = ()=>{
    // js修改必须加上.value
    // isShow.value=false
    // list.value.push(Math.random()*10)
    // obj.value.a++
    obj.value={}
  }
    return {isShow,count,list,obj,changeVar}
  }
}
</script> -->


<!-- setup 语法糖 -->
<script setup>
import { ref } from "vue";

/**
   * 使用步骤：
      - 从 `vue` 中导入 `ref` 函数
      - 在 `setup` 函数中，使用 `ref` 函数，传入普通数据（简单or复杂），返回一个响应式数据
      - 最后 `setup` 函数返回一个对象，包含该响应式数据即可
      - 注意：使用 `ref` 创建的数据，`js` 中需要 `.value` ，`template` 中可省略
   */
  // 1.语法：const 变量名 = ref(任意类型默认值)
  // 简单类型
  const isShow = ref(true)
  const count = ref(1)

  // 复杂类型
  const list =ref([1,2,5])
  const obj = ref({a:1,b:'hi'})

  const changeVar = ()=>{
    // js修改必须加上.value
    // isShow.value=false
    // list.value.push(Math.random()*10)
    // obj.value.a++
    obj.value={}
  }

</script>


<style lang="scss" scoped>

</style>