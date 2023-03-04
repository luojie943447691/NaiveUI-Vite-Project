import { FetchState, Options, PluginReturn, Service } from './types'

const data: any[] = []

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = []
  state = reactive({}) as FetchState<TData, TParams>
  params: TParams | undefined

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>
  ) {
    const { defaultParams, manual } = options

    this.params = defaultParams
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state.data = s.data
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

    if (returnNow) {
      return
    }

    this.options.onBefore?.(params)

    try {
      this.setState({
        loading: true,
        params: params,
        ...state,
      })

      // 执行请求
      let { servicePromise } = this.runPluginHandler(
        'onRequest',
        this.service,
        params
      )

      if (!servicePromise) {
        servicePromise = this.service(...(params || ({} as TParams)))
      }

      const res = await servicePromise

      setTimeout(() => {
        this.setState({
          data: res,
          error: undefined,
          loading: false,
        })
      }, 2000)
    } catch (error: any) {
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
}
