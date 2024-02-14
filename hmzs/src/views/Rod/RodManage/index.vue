<template>
  <div class="pole-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">一体杆名称：</span>
      <el-input v-model="params.poleName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">一体杆编号：</span>
      <el-input v-model="params.poleNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">运行状态：</span>
      <el-select v-model="params.poleStatus">
        <el-option v-for="item in poleStatusList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="search">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/cardAdd')">添加一体杆</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="poleList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="index" />
        <el-table-column label="一体杆名称" prop="poleName" />
        <el-table-column label="一体杆编号" prop="poleNumber" />
        <el-table-column label="一体杆IP" prop="poleIp" />
        <el-table-column label="安装区域" prop="areaName" />
        <el-table-column label="一体杆类型" prop="areaId" />
        <el-table-column label="运行状态" prop="poleStatus" :formatter="formatStatus" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="{ row }">
            <el-button size="mini" type="text" @click="editCard(row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteCard(row.id)">删除</el-button>
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

  </div>
</template>

<script>
import { getPoleListAPI } from '@/api/pole'
export default {
  data() {
    return {
      // 已选择列表
      selectedPoleList: [],
      params: {
        page: 1,
        pageSize: 10,
        poleName: null,
        poleNumber: null,
        poleStatus: null
      },
      // 一体杆列表
      poleList: [],
      total: 0,
      poleStatusList: [
        {
          id: null,
          name: '全部'
        }, {
          id: 0,
          name: '正常'
        }, {
          id: 1,
          name: '异常'
        }
      ]
    }
  },
  mounted() {
    this.getPoleList()
  },
  methods: {
    /**
     * 搜索
     */
    search() {
      this.params.page = 1
      this.getPoleList()
    },
    pageChange(page) {
      this.params.page = page
      this.getPoleList()
    },
    handleSelectionChange(poleList) {
      console.log(poleList)
      this.selectedPoleList = poleList
    },
    formatStatus(row) {
      // 定义局部变量
      const MAP = {
        0: '正常',
        1: '异常'
      }
      return MAP[row.poleStatus]
    },
    /**
     * 查询一体杆列表
     */
    async getPoleList() {
      const { data } = await getPoleListAPI(this.params)
      this.poleList = data.rows
      this.total = data.total
      this.poleList.forEach((item, index) => {
        item.index = (this.params.page - 1) * this.params.pageSize + index + 1
      })
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.pole-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-main {
    width: 220px;
    margin-right: 10px;
  }

  .search-btn {
    margin-left: 20px;
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

