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
      <el-table style="width: 100%" :data="enterpriseList">
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="mini" type="text">添加合同</el-button>
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
  </div>
</template>

<script>
import { getEnterpriseListAPI, deleteEnterpriseAPI } from '@/api/enterprise'
export default {
  name: 'Building',
  data() {
    return {
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
      // console.log('企业列表数据', data.rows)
      this.enterpriseList = data.rows
      this.total = data.total
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
