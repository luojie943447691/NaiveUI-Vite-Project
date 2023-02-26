import { FetchState, Options, PluginReturn, Service } from './types'

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = []
  state: FetchState<TData, TParams> | undefined

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>,
    public initState: Partial<FetchState<TData, TParams>> = {}
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    }
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    }
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

    // console.log('runAsync')
    try {
      // 执行请求
      let { servicePromise } = this.runPluginHandler(
        'onRequest',
        this.service,
        params
      )

      if (!servicePromise) {
        servicePromise = this.service(...params)
      }

      console.log('拿到正常结果前一刻')
      const res = await servicePromise
      console.log('拿到正常结果后一刻')

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      })

      return this.state
    } catch (error: any) {
      this.setState({
        loading: false,
        error,
      })

      return this.state
    }
  }

  run(...params: TParams) {
    console.log('run')

    return this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error)
      }
    })
  }

  refresh() {
    console.log('refresh')

    const params = this.state?.params || ([] as any[] as TParams)
    this.runAsync(...params)
  }
}
