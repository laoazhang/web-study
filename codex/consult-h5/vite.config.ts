import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 导入按需引入vant组件插件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/服务器中放置打包代码的目录名/'
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 2. 配置vant组件库按需引入
    Components({
      dts: false, // 关闭自动生成类型声明文件
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
