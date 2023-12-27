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
          <el-table-column label="头像" prop="staffPhoto">
            <template #default="{row}">
              <img v-imgerror="errorImg" :src="row.staffPhoto || defaultImg" class="avatar_photo" @click="showImgDialogFn(row.staffPhoto)">
            </template>
          </el-table-column>
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
              <!-- v-if="checkPermission('EMP_LOOK')" -->
              <el-button v-permission="'EMP_LOOK'" type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <!-- v-if="checkPermission('EMP_ROLE')" -->
              <!-- v-if="checkPermission('EMP_DELETE')" -->
              <el-button v-permission="'EMP_ROLE'" type="text" size="small" @click="showEditRoleDialogFn(row.id)">角色</el-button>
              <el-button v-permission="'EMP_DELETE'" type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination :total="total" :current-page="page" :page-size="pageSize" layout="prev, pager, next" @current-change="handleCurrentChange" />
        </div>
      </el-card>
      <add-employee :show-dialog.sync="showDialog" />
      <el-dialog width="300px" title="二维码图片" :visible="showCodeDialog" :close-on-click-modal="false" @close="closeImgDialogFn">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <assign-Role :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
    </div>
  </div>
</template>

<script>
import { getEmployeeListApi, delEmployeeApi } from '@/api/employees'
import enumObj from '@/constant/employees'
import addEmployee from './components/add-employee.vue'
import { getFormateTime } from '@/filters'
import errorImg from '@/assets/404_images/404.png'
import QrCode from 'qrcode'
import assignRole from './components/assign-role.vue'
import { mapGetters } from 'vuex'
// import dayjs from 'dayjs'
export default {
  name: 'Employees',
  components: {
    addEmployee,
    assignRole
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
      showDialog: false,
      defaultImg: 'https://hrsass-1305847999.cos.ap-beijing.myqcloud.com/1703558459813%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20231104104548.jpg',
      errorImg,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: ''
    }
  },
  computed: {
    ...mapGetters(['roles'])
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
    },
    showImgDialogFn(url) {
      if (!url) {
        this.$message.error('当前用户没有头像')
        return
      }
      this.showCodeDialog = true
      this.$nextTick(() => {
        // 如果这里 url 写的是网址, 就会跳转到对应网址 (二维码分享效果)
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    },
    closeImgDialogFn() {
      this.showCodeDialog = false
    },
    // 展示修改角色的弹框
    showEditRoleDialogFn(id) {
      this.showRoleDialog = true
      this.userId = id
    },
    // 判断用户是否有二级权限
    checkPermission(permission) {
      return this.roles?.points.includes(permission)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar_photo{
  width: 70px;
  height: 70px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
}

</style>
