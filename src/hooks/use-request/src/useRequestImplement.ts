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

  const initState = plugins
    .map((plugin) => plugin?.onInit?.(fetchOptions))
    .filter(Boolean)

  console.log('创建了')

  const fetchInstance = new Fetch(
    service,
    fetchOptions,
    Object.assign({}, ...initState)
  )

  fetchInstance.pluginImpls = plugins.map((plugin) =>
    plugin(fetchInstance, fetchOptions)
  )

  onMounted(() => {
    if (!manual) {
      const params =
        fetchInstance.state?.params ||
        options.defaultParams ||
        ([] as any[] as TParams)

      fetchInstance.run(...params)
    }
  })

  return {
    loading: fetchInstance.state?.loading,
    run: fetchInstance.run.bind(fetchInstance),
  }
}

export default useRequestImplement
