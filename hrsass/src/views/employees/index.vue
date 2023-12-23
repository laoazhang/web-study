<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>本月: 社保在缴 公积金在缴</span>
        </template>
        <template #right>
          <el-button type="primary" size="small">添加</el-button>
          <el-button type="info" size="small">导入</el-button>
        </template>
      </page-tools>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employees'

}
</script>

<style>

</style>
