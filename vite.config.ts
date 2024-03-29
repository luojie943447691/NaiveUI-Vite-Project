import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getExportsStatic } from 'pkg-exports'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import { autoUpdater } from './src/plugins/vite/autoUpdater'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const exports = (
    await Promise.allSettled([getExportsStatic('naive-ui')])
  ).map((res) => (res.status === 'fulfilled' ? res.value : []))

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      emptyOutDir: true,
      assetsDir: 'assets',
    },
    plugins: [
      autoUpdater(),
      vue(),
      Pages({
        extensions: ['tsx', 'jsx', 'ts', 'js', 'vue'],
        exclude: ['**/components/*.*'],
      }),
      vueJsx({
        include: [/.[jt]sx$/, /.vue$/],
      }),
      UnoCSS({}),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': exports[0].filter(
              (m) => m.startsWith('N') || m.startsWith('use')
            ),
          },
        ],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
      }),
    ],
    server: {
      port: 5174,
      proxy: {
        '^/api': {
          target: 'http://localhost:8888',
          rewrite(path) {
            return path.replace('/api', '')
          },
        },
        '^/server1': {
          target: 'http://localhost:8888',
          rewrite(path) {
            return path.replace('/server1', '')
          },
        },
        '^/server2': {
          target: 'http://localhost:8889',
          rewrite(path) {
            return path.replace('/server2', '')
          },
        },
      },
    },
  }
})
