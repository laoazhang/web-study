<template>
  <div>
    <h1>reactive函数的使用</h1>
    <ul>
      <li>{{ name }},{{ age }}</li>
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
import {reactive, toRefs} from 'vue'
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
    let person = reactive({name:'李白',age:18})
    // 不能直接接口person ，会失去响应式
    // let {name,age} = reactive({name:'李白',age:18})
    // 解决：解构使用toRefs函数=》语法：toRefs(传入解构的reactive变量)
    const {name,age} = toRefs(person) // 变成ref函数的定义的响应变量

    // 修改变量=》数据驱动视图
    const changePerson = () => {
      // person.age=19
      // person.age++
      // 不能=号覆盖式修改
      // person={}
      age.value++
    }

    // 2.必须返回定义的变量或函数
    // return {person,changePerson}
    return{name,age,changePerson}

  }
}
</script>

<style lang="scss" scoped>

</style>