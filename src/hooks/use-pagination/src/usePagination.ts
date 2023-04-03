import useRequest from '@/hooks/use-request'
import {
  PaginationOptions,
  PaginationParams,
  PaginationResult,
  PaginationService,
} from './types'

export function usePagination<TData, TModel>(
  service: PaginationService<TData, TModel>,
  options: PaginationOptions<TData, TModel> = {}
): PaginationResult<TData, TModel> {
  const {
    defaultPageSize = 10,
    defaultCurrent = 1,
    model = () => ({} as TModel),
    ...rest
  } = options

  // current 是否变到1
  let currentShouldBeReset = false

  const modelReactive = reactive({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    query: model(),
  }) as PaginationParams<TModel>

  const result = useRequest(service, {
    defaultParams: [modelReactive],
    refreshDepsAction() {
      if (currentShouldBeReset) {
        modelReactive.current = 1
      }

      currentShouldBeReset = false

      result.run(modelReactive)
    },
    ...rest,
  })

  const handleSubmit = async () => {
    await nextTick()
    result.run(modelReactive)
  }

  // 当前页数变化
  const handleUpdatePage = (current: number) => {
    modelReactive.current = current
  }

  // 处理页面大小变化
  const handleUpdatePageSize = (pageSize: number) => {
    currentShouldBeReset = true
    modelReactive.pageSize = pageSize
  }

  // 重置字段
  const resetFields = () => {
    currentShouldBeReset = true
    modelReactive.query = model()
  }

  const totalRef = computed(() => result.dataRef.value?.total || 0)
  const recordsRef = computed(() => result.dataRef.value?.records ?? [])

  return {
    ...result,
    pagination: {
      handleSubmit: handleSubmit,
      resetFields: resetFields,
      recordsRef,
      totalRef,
      currentRef: toRef(modelReactive, 'current'),
      pageSizeRef: toRef(modelReactive, 'pageSize'),
      handleUpdatePage: handleUpdatePage,
      handleUpdatePageSize: handleUpdatePageSize,
    },
  }
}
