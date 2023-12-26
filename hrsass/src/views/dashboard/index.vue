<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
    <!-- before-upload 上传前执行的方法 校验上传的文件、格式、大小-->
    <!-- on-success 上传成功后执行的方法 上传表格中的数据-->
    <UploadImage :limit="2" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    // 上传前校验
    beforeUpload(file) {
      // 校验 返回boolean类型
      return true
    },
    // 上传成功后校验
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
