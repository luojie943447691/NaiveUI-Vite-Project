import { debounce, DebouncedFunc, DebounceSettings } from 'lodash'
import { Plugin } from '../types'

const useDebouncePlugin: Plugin<any, any> = (fetchInstance, options) => {
  let debounceFun: DebouncedFunc<(callback: any) => any> | null = null

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
        const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

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

        onUnmounted(() => {
          debounceFun?.cancel()
          fetchInstance.runAsync = _originAsync
          watchStop()
        })
      }
    },
    {
      immediate: true,
    }
  )

  return {
    onCancel() {
      debounceFun?.cancel()
    },
  }
}

export default useDebouncePlugin
