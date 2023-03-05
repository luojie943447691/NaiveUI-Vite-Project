import { Plugin } from '../types'

const useLoadingDelayPlugin: Plugin<any, any> = (
  fetchInstance,
  { loadingDelay, ready }
) => {
  let timer: NodeJS.Timer | null = null
  let isSuccess = false

  // 如果 loadingDelay 不存在，直接返回
  if (!loadingDelay) return {}

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return {
    onBefore(params) {
      clear()
      // stopNow 表示还未准备好。 ready 存在并且 ready 返回 false 的情况。
      const stopNow = ready && !ready(params)

      // 已经准备好了
      if (!stopNow) {
        timer = setTimeout(() => {
          if (!isSuccess) {
            fetchInstance.setState({
              loading: true,
            })
          }
        }, loadingDelay)
      }

      return {
        loading: false,
      }
    },
    onSuccess(data, params) {
      isSuccess = true

      fetchInstance.setState({
        loading: false,
      })

      clear()
    },
    onCancel() {
      fetchInstance.setState({
        loading: false,
      })

      clear()
    },
  }
}

export default useLoadingDelayPlugin
