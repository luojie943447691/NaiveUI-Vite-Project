import path from 'path'
import { Plugin, ResolvedConfig } from 'vite'

export interface Options {
  interval?: number
}

const getHashFileName = (id: string, assets: string) =>
  `${fillSlash(assets)}${path.basename(id, '.html')}.hash`

const getScriptFileName = (id: string, assets: string) =>
  `${fillSlash(assets)}${path.basename(id, '.js')}.updater.js`

const fillSlash = (id: string) => {
  return id.endsWith('/') ? id : `${id}/`
}

export function autoUpdater(options?: Options): Plugin {
  const processedHtml: string[] = []
  let base = '/'
  let resolvedConfig: ResolvedConfig

  return {
    name: 'vite-plugin-auto-updater',
    enforce: 'post',
    configResolved(config) {
      base = config.base
      resolvedConfig = config
    },
    transformIndexHtml(html, { filename, bundle }) {
      let hashFileName = ''

      if (bundle) {
        const bundles = Object.values(bundle)

        const chunk = bundles.find(
          (chunk) =>
            chunk.type === 'chunk' &&
            chunk.isEntry &&
            chunk.facadeModuleId === filename
        )

        if (chunk) {
          hashFileName = chunk.fileName
        }
      }

      if (!hashFileName) return html
      processedHtml.push(filename)

      return html.replace(
        '</body>',
        `<script async src="${fillSlash(base)}${getScriptFileName(
          hashFileName,
          resolvedConfig.build.assetsDir
        )}" name="updater"></script>
        </body>`
      )
    },
    generateBundle({ format }, bundle) {
      const keys = Object.keys(bundle)
      const bundles = Object.values(bundle)

      processedHtml.forEach((id) => {
        // 获取 hash 值

        const chunk = bundles.find(
          (chunk) =>
            chunk.type === 'chunk' &&
            chunk.isEntry &&
            chunk.facadeModuleId === id
        )

        // console.log('1111111111111', chunk.fileName)
        const hash = chunk.fileName.match(/-(\w+)\.js/i)[1]

        if (chunk) {
          this.emitFile({
            type: 'asset',
            fileName: getHashFileName(id, resolvedConfig.build.assetsDir),
            source: hash,
          })

          // 生成更新文件
          this.emitFile({
            type: 'asset',
            fileName: getScriptFileName(
              chunk.fileName,
              resolvedConfig.build.assetsDir
            ),
            source: `(function(){
  function check() {
    fetch("${fillSlash(base)}${getHashFileName(
              id,
              resolvedConfig.build.assetsDir
            )}").then(async res => {
    const hash = await res.text()
    const script = document.getElementsByName("updater")
    const scriptHash = script[0].src.match(/-(\\w+)\\.updater\\.js/)[1]
    if (hash !== scriptHash) {
      const res = window.confirm("检测到新版本更新。请刷新界面！")
      if (res) {
        window.location.reload()
      }
    }
  })

}
requestAnimationFrame(check)
            })()`,
          })
        }
      })
      // for (const k in bundle) {
      //   const t = Object.prototype.hasOwnProperty.call(bundle, k)
      //   console.log('k', k)
      // }
    },
  }
}
