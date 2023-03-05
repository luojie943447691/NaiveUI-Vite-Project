import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import { Options, Plugin, Service } from './types'
import useRequestImplement from './useRequestImplement'

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImplement(service, options, [
    ...(plugins || []),
    useAutoRunPlugin,
    useLoadingDelayPlugin,
    usePollingPlugin,
  ] as Plugin<TData, TParams>[])
}

export default useRequest
