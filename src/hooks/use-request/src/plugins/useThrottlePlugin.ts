import { DebouncedFunc, throttle, ThrottleSettings } from 'lodash'
import { Plugin } from '../types'

const useThrottlePlugin: Plugin<any, any> = (fetchInstance, options) => {
  if (!options.throttleWait) return {}
  let throttleFunc: DebouncedFunc<(cb: any) => any> | null = null

  const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

  const watchStop = watchEffect(() => {
    const throttleWait = options.throttleWait

    if (throttleWait !== undefined) {
      const throttleLeading = options.throttleLeading ?? true
      const throttleTrailing = options.throttleTrailing ?? true

      const settings: ThrottleSettings = {
        leading: throttleLeading,
        trailing: throttleTrailing,
      }

      throttleFunc = throttle((cb) => cb(), throttleWait, settings)

      fetchInstance.runAsync = (...params: any) => {
        return new Promise((resolve, reject) => {
          throttleFunc?.(() => _originAsync(params).then(resolve).catch(reject))
        })
      }
    }
  })

  onUnmounted(() => {
    fetchInstance.runAsync = _originAsync
    watchStop()
  })

  return {
    onCancel() {
      throttleFunc?.cancel()
    },
  }
}

export default useThrottlePlugin
