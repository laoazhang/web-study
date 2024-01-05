import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 导入按需引入vant组件插件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
// 1.按需引入精灵图插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/服务器中放置打包代码的目录名/'
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 2. 配置vant组件库按需引入 => 项目下src/components中组件，也会呗自动全局注册
    Components({
      dts: false, // 关闭自动生成类型声明文件
      resolvers: [VantResolver()]
    }),
    // 2. 配置打包精灵图svg图片的位置
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
