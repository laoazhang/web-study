<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="showDialog">增加停车计费规则</el-button>
      <el-button @click="exportToExcel">导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column label="序号" prop="index" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上线(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式">
          <template #default="scope">
            {{ formatChargeType(scope.row.chargeType) }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editCarRule(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delCarRule(scope.row.id)">删除</el-button>
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
    <!-- 弹框 -->
    <el-dialog :visible="dialogVisible" width="680px" title="新增规则" @close="closeDialog">
      <!-- 表单接口 -->
      <div class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-position="top">
          <el-form-item label="计费规则编号" prop="ruleNumber">
            <el-input v-model="addForm.ruleNumber" />
          </el-form-item>
          <el-form-item label="计费规则名称" prop="ruleName">
            <el-input v-model="addForm.ruleName" />
          </el-form-item>
          <el-form-item label="计费方式" prop="chargeType">
            <el-radio-group v-model="addForm.chargeType" size="small">
              <el-radio label="duration" border @click.native="resetDuration">时长收费</el-radio>
              <el-radio label="turn" border @click.native="resetTurn">按次收费</el-radio>
              <el-radio label="partition" border @click.native="resetPartition">分段收费</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="flex-container">
            <el-form-item label="免费时长">
              <el-input v-model="addForm.freeDuration" />
            </el-form-item>
            <el-form-item label="收费上限">
              <el-input v-model="addForm.chargeCeiling" />
            </el-form-item>
          </div>
          <el-form-item label="计费规则">
            <!-- 按时长收费区域 -->
            <div v-if="addForm.chargeType==='duration'" class="duration">
              每 <el-input v-model="addForm.durationTime" class="input-box" /> 小时 <el-input v-model="addForm.durationPrice" class="input-box" /> 元
            </div>
            <!-- 按次收费区域 -->
            <div v-if="addForm.chargeType==='turn'" class="turn">
              每次 <el-input v-model="addForm.turnPrice" class="input-box" /> 元
            </div>
            <!-- 按分段收费区域 -->
            <div v-if="addForm.chargeType==='partition'" class="partition">
              <div class="item"><el-input v-model="addForm.partitionFrameTime" class="input-box" />小时内,每小时收费<el-input v-model="addForm.partitionFramePrice" class="input-box" /> 元</div>
              <div class="item">每增加<el-input v-model="addForm.partitionIncreaseTime" class="input-box" />小时,增加<el-input v-model="addForm.partitionIncreasePrice" class="input-box" /> 元</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitCarRule">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCarRuleListAPI, createRuleAPI, deleteCarRuleAPI } from '@/api/car'
import { utils, writeFileXLSX } from 'xlsx'
export default {
  name: 'Building',
  data() {
    return {
      // 计费规则表单对象
      addForm: {
        ruleNumber: '', // 计费规则编号
        ruleName: '', // 计费规则名称
        chargeType: 'duration', // 计费规则类型 duration / turn / partition
        chargeCeiling: null,
        freeDuration: null,
        // 时长计费独有字段
        durationTime: null, // 时长计费单位时间
        durationPrice: null, // 时长计费单位价格
        durationType: 'hour',
        // 按次收费独有字段
        turnPrice: null,
        // 分段计费独有字段
        partitionFrameTime: null, // 段内时间
        partitionFramePrice: null, // 段内费用
        partitionIncreaseTime: null, // 超出时间
        partitionIncreasePrice: null // 超出费为收费价钱
      },
      // 计费规则校验规则对象
      addFormRules: {
        ruleNumber: [
          {
            required: true,
            message: '请输入规则编号',
            trigger: 'blur'
          }
        ],
        ruleName: [
          {
            required: true,
            message: '请输入规则名称',
            trigger: 'blur'
          }
        ],
        chargeType: [
          {
            required: true,
            message: '请选择收费类型',
            trigger: 'blur'
          }
        ]
      },
      ruleList: [],
      params: {
        page: 1,
        pageSize: 3
      },
      total: 0,
      dialogVisible: false // 控制弹框关闭打开
    }
  },
  created() {
    this.getCarRuleList()
  },
  methods: {
    pageChange(page) {
      // 把点击的页数赋值给请求参数页数
      this.params.page = page
      // 重新请求列表数据
      this.getCarRuleList()
    },
    indexMethod(index) {
      // 当前页数 - 1 * 每页数据条数 + index + 1 （ index 是索引值，从0开始）
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    async delCarRule(id) {
      this.$confirm('此操作将永久删除选择的计费规则吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteCarRuleAPI(id)
        this.getCarRuleList(this.params)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 时长计费重置
     */
    resetDuration() {
      this.addForm.turnPrice = null
      this.addForm.partitionFrameTime = null
      this.addForm.partitionFramePrice = null
      this.addForm.partitionIncreaseTime = null
      this.addForm.partitionIncreasePrice = null
    },
    /**
     * 按次计费重置
     */
    resetTurn() {
      this.addForm.durationTime = null
      this.addForm.durationPrice = null
      this.addForm.durationType = 'hour'
      this.addForm.partitionFrameTime = null
      this.addForm.partitionFramePrice = null
      this.addForm.partitionIncreaseTime = null
      this.addForm.partitionIncreasePrice = null
    },
    /**
     * 分段计费重置
     */
    resetPartition() {
      this.addForm.durationTime = null
      this.addForm.durationPrice = null
      this.addForm.durationType = 'hour'
      this.addForm.turnPrice = null
    },
    /**
     * 提交表单
     */
    submitCarRule() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        await createRuleAPI(this.addForm)
        this.dialogVisible = false
        this.params.page = 1
        this.getCarRuleList(this.params)
      })
    },
    // 打开弹窗
    showDialog() {
      this.dialogVisible = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        ruleNumber: '', // 计费规则编号
        ruleName: '', // 计费规则名称
        chargeType: 'duration', // 计费规则类型 duration / turn / partition
        chargeCeiling: null,
        freeDuration: null,
        // 时长计费独有字段
        durationTime: null, // 时长计费单位时间
        durationPrice: null, // 时长计费单位价格
        durationType: 'hour',
        // 按次收费独有字段
        turnPrice: null,
        // 分段计费独有字段
        partitionFrameTime: null, // 段内时间
        partitionFramePrice: null, // 段内费用
        partitionIncreaseTime: null, // 超出时间
        partitionIncreasePrice: null // 超出费为收费价钱
      }
    },
    /**
     * 适配收费状态
     * @param {*} type
     */
    formatChargeType(type) {
      const TYPEMAP = {
        'duration': '按时长收费',
        'turn': '按次收费',
        'partition': '分段收费'
      }
      return TYPEMAP[type]
    },
    /**
     * 获取规则列表
     */
    async getCarRuleList() {
      const { data: { rows, total }} = await getCarRuleListAPI(this.params)
      // console.log('计费规则列表', rows, total)
      this.ruleList = rows
      this.ruleList.forEach((item, index) => {
        item.index = (this.params.page - 1) * this.params.pageSize + index + 1
      })
      this.total = total
    },
    async exportToExcel() {
      // 获取需要导出的业务数据
      const { data } = await getCarRuleListAPI(this.params)
      // 表头英文字段key
      const tableHeaderKeys = ['ruleNumber', 'ruleName', 'freeDuration', 'chargeCeiling', 'chargeType', 'ruleNameView']
      // 表头中文字段value
      const tableHeaderValues = ['计费规则编号', '计费规则名称', '免费时长(分钟)', '收费上线(元)', '计费方式', '计费规则']
      // 以excel表格的顺序调整后端数据 排序 枚举值转换
      const sheetData = data.rows.map(item => {
        const obj = {}
        tableHeaderKeys.forEach(key => {
          if (key === 'chargeType') {
            obj[key] = this.formatChargeType(item[key])
          } else {
            obj[key] = item[key]
          }
        })
        return obj
      })
      // 创建一个工作表
      const worksheet = utils.json_to_sheet(sheetData)
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [tableHeaderValues], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, '计费规则管理.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
