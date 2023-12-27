<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="isLoading">
        <el-tabs v-model="activeName">
          <!-- 左侧 -->
          <el-tab-pane label="角色管理" name="role">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="showAddRoleDialog"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- 放到插槽中进行数据获取 -->
                <template #default="{row}">
                  <el-button size="small" type="success" @click="showAssignDialogFn(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="showEditRoleDialog(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--
              current-page: 表示的当前页
              page-sizes: 设置当前页的页容量
              page-size：当前页的页容量
              layout: 分页的布局
              total: 一共多少条
              @size-change: 切换页容量的时候会执行该事件
              @current-change: 切换页码
             -->
            <div style="padding:10px;display:flex;justify-content:flex-end">
              <el-pagination
                :current-page="page"
                :page-sizes="[1, 2, 3, 4,5]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>

          </el-tab-pane>

          <el-tab-pane label="公司信息" name="company">
            <!-- 警告信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyForm.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :visible="showDialog" :title="showTitle" :close-on-click-modal="false" @close="closeDialog">
        <el-form ref="roleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.description" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="handleAddRole">确认</el-button>
        </template>
      </el-dialog>
      <!-- 分配权限的弹层 -->
      <el-dialog title="分配权限" :visible="showAssignDialog" :close-on-click-modal="false" @close="closeAssignDialog" @open="openAssignDialog">
        <!-- show-checkbox 可以让树状结构变得可选择 -->
        <!--   default-expand-all 可以让树默认展开全部 -->
        <el-tree
          ref="tree"
          :data="permissionList"
          :props="{label:'name'}"
          show-checkbox
          default-expand-all
          :check-strictly="true"
          node-key="id"
        />
        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeAssignDialog">取消</el-button>
            <el-button type="primary" @click="editRolePermission">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleListApi, delRoleApi, addRoleApi, getRoleDetailApi, editRoleApi, editRolePermissionApi } from '@/api/setting'
import { getPermissionListApi } from '@/api/permission'
import { getCompanyInfoApi } from '@/api/company'
import { transListToTreeData } from '@/utils'
import { mapState } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'role',
      page: 1,
      pagesize: 2,
      total: 0,
      list: [],
      isLoading: false,
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
        ]
      },
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      // 控制分配权限的弹框
      showAssignDialog: false,
      // 分配权限的角色id
      roleId: '',
      // 权限列表
      permissionList: [],
      // 角色已有的权限集合
      permIds: []
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '编辑角色' : '新增角色'
    },
    ...mapState('user', ['userInfo'])
  },
  watch: {
    activeName(newVal) {
      if (newVal === 'company') {
        this.getCompanyInfo()
      }
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
  },
  methods: {
    async getRoleList() {
      this.isLoading = true
      const { data: { rows, total }} = await getRoleListApi(this.page, this.pagesize)
      this.list = rows
      this.total = total
      this.isLoading = false
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.page = 1
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoleList()
    },
    indexMethod(index) {
      // (this.page - 1) * this.pagesize 表示的是当前页之前所有的数据总和
      return (this.page - 1) * this.pagesize + index + 1
    },
    // 删除角色
    delRole(id) {
      this.$confirm('亲，您确认要删除吗？', '温馨提示').then(async() => {
        await delRoleApi(id)
        this.$message.success('删除成功')
        // 刷新数据
        // 判断，如果删除的页码不为1，并且只有一条数据，删除之后，应该加载前一页的数据
        if (this.page > 1 && this.list.length === 1) {
          this.page--
        }
        this.getRoleList()
      }).catch((error) => { console.log(error) })
    },
    // 新增角色
    showAddRoleDialog() {
      this.showDialog = true
    },
    // 关闭弹窗
    closeDialog() {
      this.showDialog = false
      this.$refs.roleForm.resetFields()
    },
    // 提交表单
    handleAddRole() {
      this.$refs.roleForm.validate(async(flag) => {
        if (!flag) return
        if (this.form.id) {
          await editRoleApi(this.form)
          this.$message.success('修改成功')
        } else {
          await addRoleApi(this.form)
          this.$message.success('添加成功')
        }
        this.closeDialog()
        this.getRoleList()
      })
    },
    // 编辑角色信息
    async showEditRoleDialog(id) {
      this.showDialog = true
      const { data } = await getRoleDetailApi(id)
      this.form = data
    },
    async getCompanyInfo() {
      const { data } = await getCompanyInfoApi(this.userInfo.companyId)
      this.companyForm = data
    }, /**
     * 关闭分配角色弹框
     */
    closeAssignDialog() {
      this.showAssignDialog = false
      this.$refs.tree.setCheckedKeys([])
    },
    /**
     * 打开分配角色弹框
     * @param {*} id
     */
    showAssignDialogFn(id) {
      this.showAssignDialog = true
      this.roleId = id
    },
    /**
     * 获取所有权限列表
     */
    async getPermissionList() {
      const { data } = await getPermissionListApi()
      this.permissionList = transListToTreeData(data, '0')
    },
    async openAssignDialog() {
      // 获取所有的权限列表
      this.getPermissionList()
      // 获取当前角色已有的权限
      const { data: { permIds }} = await getRoleDetailApi(this.roleId)
      this.permIds = permIds
      this.$refs.tree.setCheckedKeys(this.permIds)
    },
    async editRolePermission() {
      // console.log(this.roleId)
      // console.log(this.$refs.tree.getCheckedKeys())
      const checkPermIds = this.$refs.tree.getCheckedKeys()
      await editRolePermissionApi({ id: this.roleId, permIds: checkPermIds })
      this.$message.success('恭喜，修改成功！')
      this.closeAssignDialog()
    }
  }

}
</script>

<style>

</style>
