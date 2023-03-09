import { debounce, DebouncedFunc, DebounceSettings } from 'lodash'
import { Plugin } from '../types'

const useDebouncePlugin: Plugin<any, any> = (fetchInstance, options) => {
  let debounceFun: DebouncedFunc<(callback: any) => any> | null = null
  const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

  const watchStop = watch(
    () => {
      return {
        debounceWait: options.debounceWait,
        debounceLeading: options.debounceLeading,
        debounceMaxWait: options.debounceMaxWait,
        debounceTrailing: options.debounceTrailing,
      }
    },
    ({
      debounceWait,
      debounceLeading = false,
      debounceMaxWait,
      debounceTrailing = true,
    }) => {
      if (debounceWait) {
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
    },
    {
      immediate: true,
    }
  )

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
