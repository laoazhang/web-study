<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showAddEmployeeDialog">新增员工</el-button>
        </template>
      </page-tools>

      <el-card v-loading="isLoading" style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="getEmploymentText">
            <!-- 第一种 -->
            <!-- <template #default="{row}">
              {{ getEmploymentText(row.formOfEmployment) }}
            </template> -->
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template #default="{row}">
              {{ row.timeOfEntry | getFormateTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination :total="total" :current-page="page" :page-size="pageSize" layout="prev, pager, next" @current-change="handleCurrentChange" />
        </div>
      </el-card>
      <add-employee :show-dialog.sync="showDialog">
        s
      </add-employee>
    </div>
  </div>
</template>

<script>
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
import enumObj from '@/constant/employees'
import addEmployee from './components/add-employee.vue'
// import dayjs from 'dayjs'
export default {
  name: 'Employees',
  components: {
    addEmployee
  },
  // filters: {
  //   getFormateTime(value) {
  //     return dayjs(value).format('YYYY-MM-DD')
  //   }
  // },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      isLoading: false,
      hireType: enumObj.hireType,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.isLoading = true
      const { data: { total, rows }} = await getEmployeeListApi(this.page, this.pageSize)
      this.total = total
      this.list = rows
      this.isLoading = false
    },
    // 分页变更
    handleCurrentChange(newPage) {
      this.page = newPage
      this.getEmployeeList()
    },
    indexMethod(index) {
      // (this.page - 1) * this.pagesize 表示的是当前页之前所有的数据总和
      return (this.page - 1) * this.pageSize + index + 1
    },
    // getEmploymentText(num) {
    //   return num === 1 ? '正式' : '非正式'
    // }
    getEmploymentText(row, column, cellValue, index) {
      const obj = this.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    delEmployee(id) {
      this.$confirm('您确定要删除吗？', '温馨提示').then(async() => {
        await delEmployeeApi(id)
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.$message.success('删除成功！')
        this.getEmployeeList()
      }).catch(() => {})
    },
    showAddEmployeeDialog() {
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
