import Fetch from './Fetch'
import { Options, Service, Plugin, FetchState, Result } from './types'

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
): Result<TData, TParams> {
  options.manual = options.manual ? true : false

  // console.log('创建了')

  const fetchInstance = new Fetch(service, options)

  fetchInstance.pluginImpls = plugins.map((plugin) =>
    plugin(fetchInstance, options)
  )

  return {
    loadingRef: computed(() => fetchInstance.state?.loading),
    dataRef: computed(() => fetchInstance.state.data),
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    cancel: fetchInstance.cancel.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
    mutate: fetchInstance.mutate.bind(fetchInstance),
    params: fetchInstance.params,
  }
}

export default useRequestImplement
