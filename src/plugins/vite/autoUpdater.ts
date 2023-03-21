import { Plugin } from 'vite'

export interface Options {
  interval?: number
}

export function autoUpdater(options?: Options): Plugin {
  return {
    name: 'vite-plugin-auto-updater',
    generateBundle({ format }, bundle) {
      // console.log('bundle', bundle)

      // 拿到最后一个 js
      const keys = Object.keys(bundle)

      if (keys.length) {
        // const entryName = keys[keys.length - 2]
        // console.log('entryName', entryName)
        // const content = bundle[entryName]

        for (const key in bundle) {
          console.log('==============')

          const content = bundle[key]

          for (const k in content) {
            if (k !== 'modules' && k !== 'code') {
              // if (k === 'isEntry') {
              console.log('k', k, content[k])
            }
          }
        }

        // console.log('content', content)
      }

      const test = `{
 "a":"1"
}`

      this.emitFile({
        fileName: 'test.json',
        type: 'asset',
        source: test,
      })
      // for (const k in bundle) {
      //   const t = Object.prototype.hasOwnProperty.call(bundle, k)
      //   console.log('k', k)
      // }
    },
  }
}
