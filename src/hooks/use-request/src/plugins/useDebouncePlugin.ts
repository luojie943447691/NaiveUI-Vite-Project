import { debounce } from 'lodash'
import { Plugin } from '../types'

const useDebouncePlugin: Plugin<any, any> = (
  fetchInstance,
  { debounceWait }
) => {
  if (debounceWait) {
    const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

    const debounceRef = ref(debounce((callback) => callback(), debounceWait))

    fetchInstance.runAsync = (...args) => {
      return new Promise((resolve, reject) => {
        debounceRef.value(() => {
          _originAsync(args).then(resolve).catch(reject)
        })
      })
    }

    onUnmounted(() => {
      fetchInstance.runAsync = _originAsync
    })
  }

  return {}
}

export default useDebouncePlugin
