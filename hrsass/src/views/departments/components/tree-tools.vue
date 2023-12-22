<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">

          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">修改部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartmentApi } from '@/api/department'
export default {
  props: {
    nodeData: {
      require: true,
      type: Object,
      default: () => {} // 默认为空
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(cmd, id) {
      if (cmd === 'del') {
        this.$confirm('亲,您确定要删除吗?', '温馨提示', {}).then(async() => {
          // 确定删除
          await delDepartmentApi(this.nodeData.id)
          this.$message({ type: 'success', message: '删除成功!' })
          this.$emit('del-depts')
        }).catch((error) => {
          console.log(error)
        })
      }
      if (cmd === 'add') {
        // this.nodeData 在添加的时候充当的是父级
        this.$emit('add-depts', this.nodeData)
      }
      if (cmd === 'edit') {
        // this.nodeData 在修改的时候充当的是自己
        this.$emit('edit-depts', this.nodeData)
      }
    }
  }
}
</script>

<style>

</style>
