<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small" @click="exportExcel">excel导出</el-button>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
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
import { getFormateTime } from '@/filters'
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
    },
    /**
     * 导出excel
     */
    async exportExcel() {
      // 先获取所有数据
      const { data: { rows }} = await getEmployeeListApi(1, this.total)
      const headersArr = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const headersRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const exportData = this.formateExceportData(rows, headersArr, headersRelations)
      import('@/vendor/Export2Excel').then(excel => {
        // 导出excel使用的方法
        excel.export_json_to_excel({
        // 表头
          header: headersArr,
          // 数据 data 是一个二维数组
          data: exportData,
          // 文件名
          filename: '员工信息',
          // 单元格 宽度是否是自适应
          autoWidth: true,
          // 文件的后缀名
          bookType: 'xlsx',
          multiHeader,
          merges
        })
      })
    },
    /**
     * 处理数据中的格式为二维数组
     *  */
    formateExceportData(rows, headersArr, headersRelations) {
      const result = []
      rows.forEach(item => {
        const arr = []
        headersArr.forEach(key => {
          const englishKey = headersRelations[key]
          let value = item[englishKey]
          // 时间格式转换
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            value = item[englishKey] ? getFormateTime(item[englishKey]) : ''
          }
          // 聘用方式转换
          if (englishKey === 'formOfEmployment') {
            const obj = this.hireType.find(enumObj => enumObj.id === item[englishKey])
            value = obj ? obj.value : '未知'
          }
          arr.push(value)
        })
        result.push(arr)
      })
      return result
    }
  }
}
</script>

<style>

</style>
