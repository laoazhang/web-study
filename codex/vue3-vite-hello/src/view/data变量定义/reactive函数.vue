<template>
  <div>
    <h1>reactive函数的使用</h1>
    <ul>
      <li>{{ person }}</li>
      <li>
        <button @click="changePerson">修改年龄</button>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup () {
    /**
     * 使用步骤：
      - 从 `vue` 中导入 `reactive` 函数
      - 在 `setup` 函数中，使用 `reactive` 函数，传入一个普通对象，返回一个响应式数据对象
      - 最后 `setup` 函数返回一个对象，包含该响应式对象即可，模板中可使用
     */
    // 1.语法：const 变量名 = reactive({a,b,c...})
    // const 变量名 = reactive({a,b,c...}) 
    const person = reactive({name:'李白',age:18})

    // 修改变量=》数据驱动视图
    const changePerson = () => {
      // person.age=19
      person.age++
      // 不能=号覆盖式修改
      // person={}
    }

    // 2.必须返回定义的变量或函数
    return {person,changePerson}
  }
}
</script>

<style lang="scss" scoped>

</style>