<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.name" clearable placeholder="请输入内容" class="search-main" @clear="search" />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/enterpriseAdd')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="enterpriseList" @expand-change="expandHandle">
        <el-table-column type="expand">
          <template #default="{row}">
            <el-table :data="row.rentList">
              <el-table-column label="租赁楼宇" width="320" prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime" />
              <el-table-column label="合同状态" prop="status" />
              <el-table-column label="操作" width="180">
                <template #default="scope">
                  <el-button size="mini" type="text" @click="test(scope.row.id)">退租</el-button>
                  <el-button size="mini" type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="showDialog(row.id)">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="$router.push(`/enterpriseAdd?id=${row.id}`)">编辑</el-button>
            <el-button size="mini" type="text" @click="delEnterprise(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination layout="total, prev, pager, next" :page-size="params.pageSize" :total="total" @current-change="pageChange" />
    </div>
    <el-dialog
      title="添加合同"
      :close-on-click-modal="false"
      :visible="showDialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单区域 -->
      <div class="form-container">
        <el-form ref="addForm" :model="rentForm" :rules="rentRules" label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in buildList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker
              v-model="rentForm.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="租赁合同" prop="contractId">
            <el-upload
              action="#"
              :before-upload="beforeUpload"
              :http-request="uploadRequest"
            >
              <el-button size="small" type="primary" plain>上传合同文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx .pdf, 文件大小不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div></template>

<script>
import { getEnterpriseListAPI, deleteEnterpriseAPI, getRentBuildListAPI, createRentAPI, getRentListAPI } from '@/api/enterprise'
import { uploadAPI } from '@/api/constant'
export default {
  name: 'Building',
  data() {
    return {
      // 楼宇列表
      buildList: [],
      rentForm: {
        buildingId: null, // 楼宇id
        contractId: null, // 合同id
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业名称
        type: 0, // 合同类型
        rentTime: [] // 合同时间
      },
      rentRules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        rentTime: [
          { required: true, message: '请选择租赁日期', trigger: 'change' }
        ],
        contractId: [
          { required: true, message: '请上传合同文件' }
        ]
      },
      // 弹框
      showDialogVisible: false,
      // 企业列表数据
      enterpriseList: [],
      params: {
        page: 1,
        pageSize: 2,
        name: ''
      },
      total: 0
    }
  },
  created() {
    this.getEnterpriseList(this.params)
  },
  methods: {
    // 添加合同
    confirmAdd() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return
        const { buildingId, contractId, contractUrl, enterpriseId, type } = this.rentForm
        await createRentAPI({
          buildingId, contractId, contractUrl, enterpriseId, type, startTime: this.rentForm.rentTime[0], endTime: this.rentForm.rentTime[1]
        })
        // 关闭弹框
        this.closeDialog()
        this.$message.success('添加成功')
        // 更新列表
        this.getEnterpriseList(this.params)
      })
    },
    // 上传前校验
    beforeUpload(file) {
      // console.log(file)
      const fileType = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'].includes(file.type)
      const fileSize = file.size / 1024 / 1024 < 5
      if (!fileType) {
        this.$message.error('上传合同文件只能是 DOC/DOCX/PDF 格式!')
      }
      if (!fileSize) {
        this.$message.error('上传合同文件大小不能超过 5MB!')
      }
      return fileType && fileSize
    },
    // 上传合同
    async uploadRequest({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'contract')
      const { data: { id, url }} = await uploadAPI(formData)
      // console.log(id, url)
      this.rentForm.contractId = id
      this.rentForm.contractUrl = url
      // 单独校验表单
      this.$refs.addForm.validate('contractId')
    },
    // 打开弹框
    async showDialog(id) {
      this.showDialogVisible = true
      this.rentForm.enterpriseId = id
      // 获取楼宇下拉列表
      const { data } = await getRentBuildListAPI()
      this.buildList = data
    },
    // 关闭弹框
    closeDialog() {
      this.showDialogVisible = false
    },
    // 删除
    async delEnterprise(id) {
      this.$confirm('此操作将永久删除选择的企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteEnterpriseAPI(id)
        this.getEnterpriseList(this.params)
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
    // 搜索
    search() {
      // 当前页数置为1
      this.params.page = 1
      this.getEnterpriseList(this.params)
    },
    // 序号计算
    indexMethod(index) {
      // 当前页数 - 1 * 每页数据条数 + index + 1 （ index 是索引值，从0开始）
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    pageChange(page) {
      this.params.page = page
      this.getEnterpriseList(this.params)
    },
    // 获取企业列表信息
    async getEnterpriseList(params) {
      const { data } = await getEnterpriseListAPI(params)
      this.enterpriseList = data.rows.map(item => {
        return {
          ...item,
          rentList: [] // 每一行补充存放合同的列表
        }
      })
      // console.log('企业列表数据', data.rows)
      this.enterpriseList = data.rows
      this.total = data.total
    },
    // 3. 只有展开时获取数据并绑定
    async expandHandle(row, rows) {
      console.log('展开或关闭', row, rows)
      const isExpend = rows.find(item => item.id === row.id)
      if (isExpend) {
        const { data } = await getRentListAPI(row.id)
        console.log('合同数据', data)
        // eslint-disable-next-line require-atomic-updates
        row.rentList = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}

.create-container {
  margin: 10px 0px;
}

.page-container {
  padding: 4px 0px;
  text-align: right;
}

.form-container {
  padding: 0px 80px;
}
</style>
