import { Plugin } from '../types'

const time = 1000 * 2
const maxTime = 1000 * 30

const useRetryPlugin: Plugin<any, any> = (fetchInstance, options) => {
  // 没有设置，直接返回
  if (!options.retryCount) {
    return {}
  }

  let timer: NodeJS.Timeout | null = null
  let retryCount: number | undefined
  let retryInterval: number | undefined
  let errorCount = 0

  watch(
    () => [options.retryCount, options.retryInterval],
    ([count, interval]) => {
      retryCount = count

      if (interval) {
        retryInterval = interval
      }
    },
    { immediate: true }
  )

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return {
    onBefore() {
      clear()
    },
    onSuccess(data, params) {
      errorCount = 0
    },
    onError(e, params) {
      if (!retryCount) return

      errorCount += 1

      const interval = retryInterval ?? Math.min(time * errorCount, maxTime)

      // 如果 retryCount = -1
      if (retryCount === -1 || retryCount > errorCount) {
        timer = setTimeout(() => {
          fetchInstance.run(params)
          clear()
        }, interval)
      } else {
        errorCount = 0
        clear()
      }
    },
    onCancel() {
      errorCount = 0
      clear()
    },
  }
}

export default useRetryPlugin
