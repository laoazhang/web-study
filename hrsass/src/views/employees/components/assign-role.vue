<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" :close-on-click-modal="false" @close="closeRoleDialog" @open="openDialog">
    <el-checkbox-group v-model="checkList" v-loading="isLoading">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="assignRoles">确定</el-button>
      <el-button size="small" @click="closeRoleDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleListApi } from '@/api/setting'
import { getBaseUserInfoApi } from '@/api/user'
import { assignRolesApi } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      isLoading: false
    }
  },
  methods: {
    // 关闭弹框
    closeRoleDialog() {
      this.$emit('update:showRoleDialog', false)
    //   this.showRoleDialog = false
    },
    // 获取角色列表
    async getRoleList() {
      const { data: { rows }} = await getRoleListApi(1, 9999)
      this.roleList = rows
    },
    // 打开弹框
    openDialog() {
      this.isLoading = true
      Promise.all([this.getRoleList(), this.getBaseUserInfo()]).then(() => {
        this.isLoading = false
      })
    },
    // 获取用户信息
    async getBaseUserInfo() {
      const { data } = await getBaseUserInfoApi(this.userId)
      this.checkList = data.roleIds
    },
    // 添加角色
    assignRoles() {
      assignRolesApi({
        id: this.userId,
        roleIds: this.checkList
      })
    }
  }
}
</script>
