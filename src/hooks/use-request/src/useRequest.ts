import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import useCachePlugin from './plugins/useCachePlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useRetryPlugin from './plugins/useRetryPlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'
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
    useDebouncePlugin,
    useThrottlePlugin,
    useCachePlugin,
    useRetryPlugin,
  ] as Plugin<TData, TParams>[])
}

export default useRequest
