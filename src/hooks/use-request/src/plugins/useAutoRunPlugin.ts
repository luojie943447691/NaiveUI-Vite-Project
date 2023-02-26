import Fetch from '../Fetch'
import { Options, Plugin, PluginReturn } from '../types'

const useAutoRunPlugin: Plugin<any, any> = (fetchInstance, options) => {
  const { manual, ready, refreshDepsAction } = options
  let isRunned = false

  onBeforeMount(() => {
    if (isRunned) return
    if (manual) return

    watchEffect(() => {
      isRunned = true

      if (refreshDepsAction) {
        refreshDepsAction()
      } else {
        console.log('watchEffect')

        fetchInstance.refresh()
      }
    })
  })

  return {
    onBefore(params) {
      const stopNow = ready && !ready(params)
      console.log('执行了 插件 onBefore')

      return {
        stopNow,
      }
    },
  }
}

// useAutoRunPlugin.onInit = ({ ready, manual }) => {
//   return {
//     loading: !manual && ready,
//   }
// }

export default useAutoRunPlugin
