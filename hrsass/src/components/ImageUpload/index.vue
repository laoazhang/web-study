<template>
  <div class="upload-image">
    <!--
      i标签 显示上传内的+号
      list-type="picture-card" 显示的上传组件的外边框
      action:必传的 作用：图片服务器对应地址 当你不想使用action上传的时候 可以把action配置成#
      file-list：展示上传成功后的图片 [{url:''},{url:''}]
      on-preview：预览图片
      limit：最多限制用户上传多少张
      :on-exceed 上传图片超过limit设置的值时 会执行on-exceed对应的钩子函数
      :on-remove 点击删除时 执行的钩子函数
      :http-request:自定义上传，覆盖默认的上传行为
      :on-change: 文件改变时的钩子 包括添加、上传成功、上传失败都会调用
      :before-upload: 文件上传前的执行钩子 一般用来校验文件。return  true才会让你上传 return false||Promise.reject() 则停止上传
    -->

    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :limit="limit"
      :class="{ disabled: isDisabled }"
      :http-request="handleReqeust"
      :on-change="hanldeChange"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import cos from '@/utils/cos'
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [], // [{url:'xxxx.jpg'}]
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    isDisabled() {
      return this.fileList.length >= this.limit
    },
    isAllUploadSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    /**
     * 预览时执行的函数
     * @param {*} file
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 删除时执行的函数
     */
    // file 表示的是删除的图片
    // fileList 删除后的图片列表
    // this.fileList 是咱们在data中声明的属性
    handleRemove(file, fileList) {
      // 第一种写法
      // this.fileList = [...fileList]
      // 第二种写法
      // console.log(file)
      // console.log(this.fileList)
      this.fileList = this.fileList.filter(item => {
        return item.uid !== file.uid
      })
    },
    hanldeChange(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.fileList = [...fileList]
    },
    /**
     * 上传前的校验
     * @param {} file
     */
    beforeUpload(file) {
      // console.log(file)
      // 1.文件类型
      const imgType = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/gif']
      if (!imgType.includes(file.type)) {
        this.$message.error('上传图片格式不正确')
        return false
      }
      // 2.文件大小
      // file.size单位是B -》KB  -》MB
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('图片大小不能超2M')
        return false
      }
      return true
    },
    handleReqeust({ file }) {
      // console.log(file)
      const fileObj = this.fileList.find(item => item.uid === file.uid)
      fileObj.status = 'uploading'
      cos.putObject({
        Bucket: 'hrsass-1305847999',
        Region: 'ap-beijing',
        Key: +new Date() + file.name,
        StorageClass: 'STANDARD',
        Body: file,
        onProgress: function(progressData) {
          // 上传的进度
          // console.log(JSON.stringify(progressData))
          fileObj.percentage = progressData.percent * 100
        }
      }, function(err, data) {
        // console.log(err || data)
        if (err) {
          this.$message.error('上传失败，请稍后再试')
          return
        }
        fileObj.url = 'https://' + data.Location
        setTimeout(() => {
          fileObj.status = 'success'
        }, 800)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload {
      display: none;
    }
  }
}
</style>
