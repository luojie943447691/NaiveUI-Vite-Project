import { Options, Result, Service } from '@/hooks/use-request/src/types'
import { MaybePromise } from '@/utils/types'

export type SubmitService<TData, TModel> = (...args: [TModel]) => Promise<TData>

export interface SubmitOptions<TData, TModel> extends Options<TData, [TModel]> {
  model: () => TModel
  validator?: () => unknown
}

export interface SubmitResult<TData, TModel> extends Result<TData, [TModel]> {
  submit: {
    modelRef: Ref<TModel>
    handleSubmit: () => MaybePromise<void>
    resetFields: () => void
    handleReset: () => void
  }
}
