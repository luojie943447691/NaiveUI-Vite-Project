import { debounce, DebouncedFunc, DebounceSettings } from 'lodash'
import { Plugin } from '../types'

const useDebouncePlugin: Plugin<any, any> = (fetchInstance, options) => {
  let debounceFun: DebouncedFunc<(callback: any) => any> | null = null
  const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

  const watchStop = watchEffect(() => {
    const debounceWait = options.debounceWait

    if (debounceWait) {
      const debounceLeading = options.debounceLeading ?? false
      const debounceMaxWait = options.debounceMaxWait
      const debounceTrailing = options.debounceTrailing ?? true

      const settings: DebounceSettings = {
        leading: debounceLeading,
        trailing: debounceTrailing,
      }

      if (debounceMaxWait !== undefined) {
        settings.maxWait = debounceMaxWait
      }

      debounceFun = debounce((callback) => callback(), debounceWait, settings)

      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          debounceFun?.(() => {
            _originAsync(args).then(resolve).catch(reject)
          })
        })
      }
    }
  })

  onUnmounted(() => {
    debounceFun?.cancel()
    fetchInstance.runAsync = _originAsync
    watchStop()
  })

  return {
    onCancel() {
      debounceFun?.cancel()
    },
  }
}

export default useDebouncePlugin
