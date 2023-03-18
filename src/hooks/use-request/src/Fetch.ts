import { isNullable } from '@/utils'
import { FetchState, Options, PluginReturn, Service } from './types'

const data: any[] = []

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = []
  state = reactive({}) as FetchState<TData>
  params: TParams | undefined
  maxRequestNumber = 3
  // 所有执行的请求
  allAromiseArr: Array<Promise<any>> = []
  // 正在执行的请求
  excutingPromiseArr: Array<Promise<any>> = []

  // retry 相关

  constructor(
    public service: Service<TData, TParams>,
    public options: Options<TData, TParams>
  ) {
    const { defaultParams } = options

    this.params = defaultParams
  }

  setState(s: Partial<FetchState<TData>> = {}) {
    // if (!isNullable(s.data)) {
    //   this.state.data = s.data
    // }

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

      const res = await servicePromise

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      })

      this.runPluginHandler('onSuccess', res, params)
    } catch (error: any) {
      this.runPluginHandler('onError', this.service, params)

      this.setState({
        loading: false,
        error,
      })
    }
  }

  asyncPool(
    poolLimit: number,
    array: Promise<any>[],
    iteratorFn: (...p: any[]) => any
  ) {
    let i = 0

    const enqueue: () => Promise<any> = () => {
      // 边界处理，array为空数组
      if (i === array.length) {
        return Promise.resolve()
      }

      // 每调一次enqueue，初始化一个promise
      const item = array[i++]
      const p = Promise.resolve().then(() => iteratorFn(item, array))
      // 放入promises数组
      this.allAromiseArr.push(p)

      // promise执行完毕，从executing数组中删除
      const e: Promise<any> = p.then(() =>
        this.excutingPromiseArr.splice(this.excutingPromiseArr.indexOf(e), 1)
      )

      // 插入executing数字，表示正在执行的promise
      this.excutingPromiseArr.push(e)
      // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
      let r = Promise.resolve()

      if (this.excutingPromiseArr.length >= poolLimit) {
        r = Promise.race(this.excutingPromiseArr)
      }

      // 递归，直到遍历完array
      return r.then(() => enqueue())
    }

    return enqueue().then(() => Promise.all(this.allAromiseArr))
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
