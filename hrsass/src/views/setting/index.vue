<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="isLoading">
        <el-tabs>
          <!-- 左侧 -->
          <el-tab-pane label="角色管理">
            <!-- 按钮 -->
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
            >新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="list">
              <el-table-column label="序号" width="100" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <!-- 放到插槽中进行数据获取 -->
                <template #default="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
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

          <el-tab-pane label="公司信息">
            <!-- 公司信息 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleListApi, delRoleApi } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: '',
      page: 1,
      pagesize: 2,
      total: 0,
      list: [],
      isLoading: false
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
    }
  }

}
</script>

<style>

</style>
