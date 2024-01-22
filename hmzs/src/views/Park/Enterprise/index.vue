<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input clearable placeholder="请输入内容" class="search-main" />
      <el-button type="primary">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="enterpriseList">
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="{ rows }">
            <el-button size="mini" type="text">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text" @click="editEnterprise(rows.id)">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination layout="total, prev, pager, next" :page-size="params.pageSize" :total="total"
        @current-change="pageChange" />
    </div>
  </div>
</template>

<script>
import { getEnterpriseListAPI } from '@/api/enterprise'
export default {
  name: 'Building',
  data() {
    return {
      // 企业列表数据
      enterpriseList: [],
      params: {
        page: 1,
        pageSize: 2
      },
      total: 0
    }
  },
  created() {
    this.getEnterpriseList(this.params)
  },
  methods: {
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
      console.log('企业列表数据', data.rows)
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
