<template>
  <!-- @drop：你在拖拽区域内 鼠标松手的时候松手的时候执行 -->
  <!-- @dragover：你鼠标拖拽文件 进入区域内 鼠标松手之前会执行 -->
  <!-- @dragenter：你鼠标拖拽文件 进入拖拽区域时执行 -->
  <!-- handleDragover 阻止浏览器下载文件的默认行为 -->
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" size="mini" type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>

    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">

    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <i class="el-icon-upload" />
      <span>将文件拖到此处</span>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      // e.target.files 表示 点击上传时获取上传文件的方式
      // e.dataTransfer.files  拖拽上传时 获取文件的方式
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      // 把你第一个上传的文件 获取到
      const rawFile = files[0] // only use files[0]
      // 拿到文件后 判断 上传的文件格式
      if (!this.isExcel(rawFile)) {
        this.$message.error('只能上传 .xlsx, .xls, .csv 等格式文件')
        return false
      }
      // 执行upload方法
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      // 阻止了默认事件
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      // 上传的文件列表
      const files = e.target.files
      // 只取出你上传的第一个文件
      const rawFile = files[0] // only use files[0]
      // 如果没有选择文件 则return
      if (!rawFile) return
      // 选择了文件 执行upload方法
      this.upload(rawFile)
    },
    upload(rawFile) {
      // 首先 清空一下 input:file框的value属性  目的让你可以多次上传同一个文件
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      // this.beforeUpload 代表的判断你传没传这个beforeUpload方法
      if (!this.beforeUpload) {
        // 没传上传前的校验这个方法，直接读取你传的这个文件
        this.readerData(rawFile)
        return
      }
      // 传了beforeUpload 就先调用beforeUpload 进行文件的校验
      const before = this.beforeUpload(rawFile)
      if (before) {
        // 如果校验通过 则读取你的文件
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        // FileReader 文件读取器（html5中新增）
        const reader = new FileReader()
        // 监听 onload事件，是在你读取成功之后 执行
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          // 读取成功之后获取excel的标头
          const header = this.getHeaderRow(worksheet)
          // 读取成功之后获取excel中的内容
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        // readAsArrayBuffer 开始读取文件
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    padding-top: 20px;
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
