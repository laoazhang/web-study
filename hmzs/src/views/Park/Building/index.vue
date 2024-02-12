<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">楼宇名称：</div>
      <el-input v-model="params.name" placeholder="请输入内容" class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <el-button type="primary" @click="addBuilding">添加楼宇</el-button>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="buildingList" style="width: 100%">
        <el-table-column label="序号" prop="index" />
        <el-table-column label="楼宇名称" prop="name" width="180" />
        <el-table-column label="层数" prop="floors" />
        <el-table-column label="在管面积(m²)" width="120" prop="area" />
        <el-table-column label="物业费(元/m²)" width="120" prop="propertyFeePrice" />
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            {{ formatStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="demoFlag">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editPark(scope.rows.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delPark(scope.rows.id)">删除</el-button>
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
    <!-- 添加楼宇弹框 -->
    <el-dialog
      title="添加楼宇"
      :visible="dialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
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
import { getBuildingListAPI, createBuildingListAPI } from '@/api/building'
export default {
  name: 'Building',
  data() {
    return {
      addForm: {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' }
        ],
        floors: [
          { required: true, message: '请输入楼宇层数', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入楼宇面积', trigger: 'blur' }
        ],
        propertyFeePrice: [
          { required: true, message: '请输入楼宇物业费', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      params: {
        page: 1,
        pageSize: 10,
        name: ''
      },
      buildingList: [],
      total: 0
    }
  },
  mounted() {
    this.getBuildingList()
  },
  methods: {
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (!valid) return
        await createBuildingListAPI(this.addForm)
        this.dialogVisible = false
        this.getBuildingList()
      })
    },
    addBuilding() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.addForm = {
        name: '',
        floors: null,
        area: null,
        propertyFeePrice: null
      }
    },
    /**
     * 条件查询
     */
    doSearch() {
      this.params.page = 1
      this.getBuildingList()
    },
    /**
     * 分页切换
     * @param {*} page
     */
    pageChange(page) {
      this.params.page = page
      this.getBuildingList()
    },
    /**
     * 状态置换
     * @param {*} status
     */
    formatStatus(status) {
      const statusMap = {
        0: '租赁中',
        1: '闲置中'
      }
      return statusMap[status]
    },
    /**
     * 楼宇列表查询
     */
    async getBuildingList() {
      const { data, total } = await getBuildingListAPI(this.params)
      console.log('楼宇列表数据', data, total)
      this.buildingList = data.rows
      this.total = data.total
      this.buildingList.map((item, index) => {
        item.index = (this.params.page - 1) * this.params.pageSize + index + 1
      })
      console.log(this.total)
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
