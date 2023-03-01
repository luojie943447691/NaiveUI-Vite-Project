import { Plugin } from '../types'

const useAutoRunPlugin: Plugin<any, any> = (fetchInstance, options) => {
  const { manual, ready, refreshDepsAction } = options

  onBeforeMount(() => {
    if (manual) return

    watchEffect(() => {
      if (refreshDepsAction) {
        refreshDepsAction()
      } else {
        fetchInstance.refresh()
      }
    })
  })

  return {
    onBefore(params) {
      const stopNow = ready && !ready(params)
      // console.log('执行了 useAutoRunPlugin 插件 onBefore')

      return {
        stopNow,
      }
    },
  }
}

export default useAutoRunPlugin
