import { WatchStopHandle } from 'vue'
import { Plugin } from '../types'

const usePollingPlugin: Plugin<any, any> = (fetchInstance, options) => {
  const {
    pollingErrorRetryCount = -1,
    pollingInterval,
    pollingWhenHidden,
    manual,
    loadingDelay,
    ready,
  } = options

  const pollingIntervalRef = ref<number>(pollingInterval ?? 0)
  const pollingWhenHiddenRef = ref<boolean>(Boolean(pollingWhenHidden))

  let watchStop: WatchStopHandle | null = null
  let timer: NodeJS.Timer | null = null
  let currentErrCount = 0
  // 用于判断首次加载之后，调用 run/runAsync 时判断 manual 的问题
  let loaded = false

  const doWatch = () => {
    watchStop = watch(
      () => ({
        pollingInterval: options.pollingInterval,
        pollingWhenHidden: options.pollingWhenHidden,
      }),
      ({ pollingInterval, pollingWhenHidden }) => {
        if (pollingInterval || pollingInterval === 0) {
          pollingIntervalRef.value = pollingInterval
        }

        pollingWhenHiddenRef.value = Boolean(pollingWhenHidden)

        doSetInterval()
      }
    )
  }

  function visibilitychange() {
    if (window.document.hidden) {
      clearSetInterval()
      watchStop?.()
    } else {
      doWatch()
      doSetInterval()
    }
  }

  document.addEventListener('visibilitychange', visibilitychange)
  // watch(
  //   () => window.document.hidden,
  //   (hidden) => {
  //     console.log('hidden', hidden)
  //   }
  // )

  const doSetInterval = () => {
    clearSetInterval()

    timer = setInterval(() => {
      fetchInstance.runAsync(fetchInstance.params)
    }, pollingIntervalRef.value)
  }

  const clearSetInterval = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onUnmounted(() => {
    clearSetInterval()

    document.removeEventListener('visibilitychange', visibilitychange)
  })

  return {
    onBefore(params) {
      const stopNow = ready && !ready(params)

      // 非手动 且已准备好
      if ((!manual || loaded) && !stopNow && pollingIntervalRef.value > 0) {
        doWatch()
        doSetInterval()
      }

      if (!loaded) {
        loaded = true
      }

      return {}
    },
    onError(e, params) {
      currentErrCount += 1

      if (currentErrCount >= pollingErrorRetryCount) {
        clearSetInterval()
      }
    },
    onCancel() {
      clearSetInterval()
      watchStop?.()
    },
  }
}

export default usePollingPlugin
