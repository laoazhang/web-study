<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card v-loading="isLoading" class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" :is-root="true" @add-depts="showAddDeptsDialog" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <template #default="{data}">
            <!-- 当el-row 放到其他标签中，宽度是通过内容撑开的 -->
            <tree-tools :node-data="data" @del-depts="getDeparmentList" @add-depts="showAddDeptsDialog" @edit-depts="showEditDeptsDialog" />
          </template>
        </el-tree>
      </el-card>
      <add-depts ref="addDepts" :show-dialog.sync="showDialog" :node-data="nodeData" :departs-list="departsList" @add-depts-success="getDeparmentList" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import { getDeparmentListApi } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import addDepts from './components/add-depts.vue'
export default {
  name: 'Departments',
  components: {
    treeTools,
    addDepts
  },
  data() {
    return {
      departs: [],
      departsList: [],
      company: {
        name: '',
        manager: '负责人',
        id: ''
      },
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      nodeData: {},
      isLoading: false
    }
  },
  created() {
    this.getDeparmentList()
  },
  methods: {
    async getDeparmentList() {
      this.isLoading = true
      const { data } = await getDeparmentListApi()
      this.company.name = data.companyName
      this.departs = transListToTreeData(data.depts, '')
      this.departsList = data.depts
      this.isLoading = false
    },
    closeDialog(val) {
      this.showDialog = val
    },
    showAddDeptsDialog(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      // 获取员工简单列表
      // this.$refs.addDepts.getSimpleUserList()
      // this.$refs.addDepts.showTitle = '添加部门'
    },
    showEditDeptsDialog(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
      // 获取员工简单列表
      // this.$refs.addDepts.getSimpleUserList()
      // this.$refs.addDepts.showTitle = '修改部门'
      this.$nextTick(() => {
        this.$refs.addDepts.getDepartmentDetail()
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
