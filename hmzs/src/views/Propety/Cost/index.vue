<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.enterpriseName" placeholder="请输入企业名称" class="search-main" />
      <div class="block">
        <span class="demonstration">缴费时间：</span>
        <el-date-picker
          v-model="params.payTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <el-button type="primary" @click="showDialog">添加账单</el-button>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="propetyList" style="width: 100%">
        <el-table-column label="序号" prop="index" width="120" />
        <el-table-column label="账单编号" prop="billNumber" width="180" />
        <el-table-column label="企业名称" prop="enterpriseName" width="300" />
        <el-table-column label="租凭楼宇" prop="buildingName" width="180" />
        <el-table-column label="物业费(元/m²)" width="120" prop="propertyFeePrice" />
        <el-table-column label="账单金额(元)" width="120" prop="paymentAmount" />
        <el-table-column label="缴费时间" prop="createTime" width="180" />
        <el-table-column label="操作" prop="demoFlag">
          <template #default="scope">
            <el-button size="mini" type="text" @click="lookPropety(scope.row.id)">查看</el-button>
            <el-button size="mini" type="text" @click="delPropety(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="params.pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </div>
    <!-- 添加账单弹框 -->
    <el-dialog
      :title="showTitle"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单接口 -->
      <div v-if="addForm.id===''" class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="选择租户" prop="enterpriseId">
            <el-select v-model="addForm.enterpriseId">
              <el-option
                v-for="item in enterpriseList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租凭楼宇" prop="buildingId">
            <el-select v-model="addForm.buildingId">
              <el-option
                v-for="item in buildingList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="缴费周期" prop="payTime">
            <el-date-picker
              v-model="addForm.payTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="支付金额" prop="paymentAmount">
            <el-input v-model="addForm.paymentAmount" :disabled="true" />
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-select v-model="addForm.paymentMethod">
              <el-option
                v-for="item in payMethodList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="form-container">
        <el-form>
          <el-form-item label="租户名称：">{{ addForm.enterpriseName }}</el-form-item>
          <el-form-item label="租凭楼宇：">{{ addForm.buildingName }}</el-form-item>
          <el-form-item label="缴费周期：">{{ addForm.startTime }}至{{ addForm.endTime }}</el-form-item>
          <el-form-item label="物业费(元/m²)：">{{ addForm.propertyFeePrice }}</el-form-item>
          <el-form-item label="账单金额(元)：">{{ addForm.paymentAmount }}</el-form-item>
          <el-form-item label="支付方式：">{{ formartPayMethod(addForm.paymentMethod) }}</el-form-item>
          <el-form-item label="缴费时间：">{{ addForm.createTime }}</el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPropetyListAPI, getPaymentAPI, createPropetyAPI, getPropetyDetailAPI, delPropetyAPI } from '@/api/propety'
import { getEnterpriseListAPI } from '@/api/enterprise'
import { getBuildingListAPI } from '@/api/building'
import dayjs from 'dayjs'
// 格式化日期
export function formatDate(value, str = 'YYYY-MM-DD') {
  return dayjs(value).format(str)
}
export default {
  name: 'Cost',
  data() {
    return {
      // 支付方式列表
      payMethodList: [
        {
          id: '1',
          name: '微信'
        },
        {
          id: '2',
          name: '支付宝'
        },
        {
          id: '3',
          name: '现金'
        }
      ],
      dialogVisible: false,
      propetyList: [],
      params: {
        page: 1,
        pageSize: 10,
        payTime: '',
        enterpriseName: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      enterpriseList: [],
      buildingList: [],
      addForm: {
        id: '',
        enterpriseId: '',
        buildingId: '',
        payTime: '',
        startTime: '',
        endTime: '',
        paymentAmount: '',
        paymentMethod: ''
      },
      paymentAmounts: '',
      addFormRules: {
        enterpriseId: [
          { required: true, message: '请选择租户', trigger: 'blur' }
        ],
        buildingId: [
          { required: true, message: '请选择租凭楼宇', trigger: 'blur' }
        ],
        payTime: [
          { required: true, message: '请选择缴费时间', trigger: 'blur' }
        ],
        paymentAmount: [
          { required: true, message: '请输入支付金额', trigger: 'blur' }
        ],
        paymentMethod: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.addForm.id ? '查看账单' : '添加账单'
    }
  },
  watch: {
    'addForm.buildingId': {
      handler: function(newValue, oldValue) {
        this.change()
      },
      deep: true
    },
    'addForm.payTime': {
      handler: function(newValue, oldValue) {
        this.change()
      },
      deep: true
    }
  },
  mounted() {
    this.getPropetyList()
  },
  methods: {
    delPropety(id) {
      this.$confirm('此操作将永久删除选择的账单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delPropetyAPI(id)
          this.getPropetyList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 格式化status
    formartPayMethod(type) {
      const TYPEMAP = {
        1: '支付宝',
        2: '微信',
        3: '现金'
      }
      return TYPEMAP[type]
    },
    async lookPropety(id) {
      this.dialogVisible = true
      const { data } = await getPropetyDetailAPI(id)
      this.addForm = data
      this.addForm.payTime = [data.startTime, data.endTime]
    },
    async confirmAdd() {
      this.addForm.startTime = formatDate(this.addForm.payTime[0])
      this.addForm.endTime = formatDate(this.addForm.payTime[1])
      delete this.addForm.payTime
      delete this.addForm.id
      await createPropetyAPI(this.addForm)
      this.dialogVisible = false
      this.getPropetyList()
    },
    async change() {
      if (this.addForm.buildingId === '' || this.addForm.payTime === '') return
      const { data } = await getPaymentAPI({
        buildingId: this.addForm.buildingId,
        startTime: formatDate(this.addForm.payTime[0]),
        endTime: formatDate(this.addForm.payTime[1])
      })
      this.addForm.paymentAmount = data
    },
    showDialog() {
      this.dialogVisible = true
      this.getEnterpriseList()
      this.getBuildingList()
    },
    async getEnterpriseList() {
      const { data } = await getEnterpriseListAPI()
      this.enterpriseList = data.rows
    },
    async getBuildingList() {
      const { data } = await getBuildingListAPI()
      this.buildingList = data.rows
    },
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        id: '',
        enterpriseId: '',
        buildingId: '',
        payTime: '',
        startTime: '',
        endTime: '',
        paymentAmount: '',
        paymentMethod: ''
      }
    },
    doSearch() {
      this.params.page = 1
      this.getPropetyList()
    },
    pageChange(page) {
      this.params.page = page
      this.getPropetyList()
    },
    async getPropetyList() {
      if (this.params.payTime !== '') {
        this.params.start = formatDate(this.params.payTime[0])
        this.params.end = formatDate(this.params.payTime[1])
      }
      delete this.params.payTime
      const { data } = await getPropetyListAPI(this.params)
      this.propetyList = data.rows
      this.total = data.total
      this.propetyList.map((item, index) => {
        item.index = (this.params.page - 1) * this.params.pageSize + index + 1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 4px 0px;
  text-align: right;
}

.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
</style>
