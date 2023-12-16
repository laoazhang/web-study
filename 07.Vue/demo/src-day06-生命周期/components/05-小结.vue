<template>
  <div>
    <p>
      插槽：
          解决：传入不同结构（包括数据）
          基本用法：
              子组件内部：<slot></slot>  注重位置！
              父组件调用：<子组件> 要传入的结构 </子组件>
          
          具名：多个地方传入结构
              子组件内部：<slot name="a"></slot>  <slot name="b"></slot>  
              父组件调用：<子组件> 
                            <template #a>要传入结构1</template>
                            <template #b>要传入结构2</template>
                         </子组件>

          作用域插槽：传入结构的时候，需要用下子组件内部的数据！
              子组件内部：<slot :row="对象"></slot>
              父组件调用：<子组件> 
                            <template v-slot="scope">要传入{{scope.row.xxx属性名}}结构1</template>
                         </子组件>
          
          具名作用域插槽：elementUI Vant
              子组件内部：<slot name="a" :row="对象"></slot>  <slot name="b" :row="对象"></slot>  
              父组件调用：<子组件> 
                            <template #a="scope">要传入{{scope.row.xxx属性名}}结构1</template>
                            <template #b="scope">要传入{{scope.row.xxx属性名}}结构2</template>
                         </子组件>

    商品列表：自己练习！

    生命周期：
          内置函数，不需要手动调用，到了特别点，自己调用！
          三个阶段
              初始化阶段：把data初始化数据装在组件对象上
              运行阶段：把html结构是否镶嵌在真实dom树（更新阶段：数据变化后，是否把补丁更新到真实dom节点）
              销毁阶段：看组件内子组件侦听器、其内部子组件是否移除！
          重要：created 初始化获取ajax数据！
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>