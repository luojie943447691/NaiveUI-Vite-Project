import { UnwrapRef } from 'vue'
import { Nullable } from '@/types'
import Fetch from './Fetch'
import { CachedData } from './utils/cache'

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData>

export interface Options<TData, TParams extends any[]> {
  manual?: boolean

  onBefore?: (params?: TParams) => void
  onSuccess?: (data: TData, params?: TParams) => void
  onError?: (e: Error, params?: TParams) => void
  // formatResult?: (res: any) => TData;
  onFinally?: (params?: TParams, data?: TData, e?: Error) => void

  defaultParams?: TParams

  // refreshDeps
  refreshDepsAction?: () => void

  // loading delay
  loadingDelay?: number

  // polling
  pollingInterval?: number
  pollingWhenHidden?: boolean
  pollingErrorRetryCount?: number

  // refresh on window focus
  refreshOnWindowFocus?: boolean
  focusTimespan?: number

  // debounce
  debounceWait?: number
  debounceLeading?: boolean
  debounceTrailing?: boolean
  debounceMaxWait?: number

  // throttle
  throttleWait?: number
  throttleLeading?: boolean
  throttleTrailing?: boolean

  // cache
  cacheKey?: string
  cacheTime?: number
  staleTime?: number
  setCache?: (data: CachedData<TData, TParams>) => void
  getCache?: (params: TParams) => CachedData<TData, TParams> | undefined

  // retry
  retryCount?: number
  retryInterval?: number

  // ready
  ready?: (params?: TParams) => boolean

  // // [key: string]: any;
}

export type Plugin<TData, TParams extends any[]> = {
  (
    fetchInstance: Fetch<TData, TParams>,
    options: Options<TData, TParams>
  ): PluginReturn<TData, TParams>
}

export interface FetchState<TData> {
  loading: boolean
  data?: TData
  error?: Error
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean
        returnNow?: boolean
      } & Partial<FetchState<TData>>)
    | void

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>
    rawServicePromise?: Promise<TData>
  }

  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void
  onCancel?: () => void
  onMutate?: (data: TData) => void
}

export interface Result<TData, TParams extends any[]> {
  loadingRef: ComputedRef<boolean>
  dataRef: ComputedRef<TData | undefined>
  error?: Error
  params: Nullable<TParams>
  cancel: Fetch<TData, TParams>['cancel']
  refresh: Fetch<TData, TParams>['refresh']
  refreshAsync: Fetch<TData, TParams>['refreshAsync']
  run: Fetch<TData, TParams>['run']
  runAsync: Fetch<TData, TParams>['runAsync']
  mutate: Fetch<TData, TParams>['mutate']
}
