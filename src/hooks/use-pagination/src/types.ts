import { Options, Result } from '../../use-request/src/types'

export type PaginationData<TData> = { total: number; records: TData[] }

export type PaginationParams<TModel> = {
  current: number
  pageSize: number
  query: TModel
}

export type PaginationService<TData, TModel> = (
  ...args: [PaginationParams<TModel>]
) => Promise<PaginationData<TData>>

export interface PaginationResult<TData, TModel>
  extends Result<PaginationData<TData>, [PaginationParams<TModel>]> {
  pagination: {
    currentRef: Ref<number>
    pageSizeRef: Ref<number>
    totalRef: ComputedRef<number>
    recordsRef?: ComputedRef<TData[]>
    handleUpdatePage: (current: number) => void
    handleUpdatePageSize: (pageSize: number) => void
    handleSubmit: () => void
    resetFields: () => void
  }
}

export interface PaginationOptions<TData, TModel>
  extends Options<PaginationData<TData>, [PaginationParams<TModel>]> {
  model?: () => TModel
  defaultPageSize?: number
  defaultCurrent?: number
}
