<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="showAddRoleDialog(1,'0')">添加权限</el-button>
        </div>
        <!-- row-key="id" -->
        <!-- row-key表示的是 数据中的唯一表示 类型是字符串 -->
        <el-table border :data="permissionList" row-key="id" default-expand-all>
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type===1" size="small" type="text" @click="showAddRoleDialog(2,row.id)">添加权限点</el-button>
              <el-button size="small" type="text" disabled @click="editRole(row.id)">修改</el-button>
              <el-button size="small" type="text" disabled @click="delRold(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 新增编辑的弹层 -->
      <el-dialog :visible="showDialog" :title="showTitle" :close-on-click-modal="false" @close="closeDialog">
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="addPermission">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionListApi, addPermissionApi, delPermissionApi, getPermissionDetailApi, updatePermissionApi } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      },
      showTitle: ''
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    /**
     * 获取权限列表
     */
    async getPermissionList() {
      const { data } = await getPermissionListApi()
      this.permissionList = transListToTreeData(data, '0')
    },
    /**
     * 点击添加时展示弹框
     * @param {*} type
     * @param {*} pid
     */
    showAddRoleDialog(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
      this.showTitle = '添加权限'
    },
    closeDialog() {
      this.showDialog = false
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    },
    /**
     * 添加权限
     */
    async addPermission() {
      if (this.formData.id) {
        // 修改
        await updatePermissionApi(this.formData)
        this.$message.success('恭喜！修改权限成功')
      } else {
        // 添加
        await addPermissionApi(this.formData)
        this.$message.success('恭喜！添加权限成功')
      }
      this.closeDialog()
      this.getPermissionList()
    },
    /**
     * 删除权限
     * @param {*} id
     */
    delRold(id) {
      this.$confirm('亲！您确定要删除吗？', '温馨提示').then(async() => {
        await delPermissionApi(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      }).catch(() => {})
    },
    /**
     * 修改权限
     * @param {*} id
     */
    async editRole(id) {
      this.showDialog = true
      const { data } = await getPermissionDetailApi(id)
      this.formData = data
      this.showTitle = '修改权限'
    }
  }
}
</script>
