import { isNullable } from '@/utils'
import { FetchState, Options, PluginReturn, Service } from './types'

const data: any[] = []

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = []
  state = reactive({}) as FetchState<TData, TParams>
  params: TParams | undefined

  // retry 相关

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>
  ) {
    const { defaultParams } = options

    this.params = defaultParams
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    if (!isNullable(s.data)) {
      this.state.data = s.data
    }

    this.state.error = s.error
    this.state.loading = s.loading
  }

  runPluginHandler(key: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    const res = this.pluginImpls
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map((plugin) => plugin[key]?.(...rest))
      .filter(Boolean)

    return Object.assign({}, ...res)
  }

  async runAsync(...params: TParams) {
    // 执行所有插件的 onBefore 方法
    const { stopNow, returnNow, ...state } = this.runPluginHandler(
      'onBefore',
      params
    )

    if (stopNow) {
      return
    }

    this.setState({
      loading: true,
      params: params,
      ...state,
    })

    if (returnNow) {
      return
    }

    this.options.onBefore?.(params)

    try {
      // 执行请求
      let { servicePromise } = this.runPluginHandler(
        'onRequest',
        this.service,
        params
      )

      if (!servicePromise) {
        servicePromise = this.service(...(params || ({} as TParams)))
      }

      // console.time()
      const res = await servicePromise
      // console.timeEnd()

      this.runPluginHandler('onSuccess', this.service, params)

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      })
    } catch (error: any) {
      this.runPluginHandler('onError', this.service, params)

      this.setState({
        loading: false,
        error,
      })
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error)
      }
    })
  }

  refresh() {
    const params = this.params || (data as TParams)
    this.runAsync(...params)
  }

  cancel() {
    this.runPluginHandler('onCancel')
  }
}
