import Fetch from './Fetch'
import { Options, Service, Plugin, FetchState } from './types'

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  const { manual = false, ...rest } = options

  const fetchOptions = {
    manual,
    ...rest,
  }

  // console.log('创建了')

  const fetchInstance = new Fetch(service, fetchOptions)

  fetchInstance.pluginImpls = plugins.map((plugin) =>
    plugin(fetchInstance, fetchOptions)
  )

  return {
    loadingRef: computed(() => fetchInstance.state?.loading),
    run: fetchInstance.run.bind(fetchInstance),
  }
}

export default useRequestImplement
