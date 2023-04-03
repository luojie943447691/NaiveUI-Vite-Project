import { isArray, isObject } from 'lodash'
import useRequest from '@/hooks/use-request'
import { SubmitOptions, SubmitResult, SubmitService } from './types'

export function useSubmit<TData, TModel>(
  service: SubmitService<TData, TModel>,
  options: SubmitOptions<TData, TModel>
): SubmitResult<TData, TModel> {
  const { model = () => ({} as TModel), validator, ...rest } = options

  const modelRef = ref(model()) as Ref<TModel>

  const request = useRequest(service, {
    ...rest,
    manual: true,
  })

  const resetFields = () => {
    if (isArray(modelRef.value)) {
      modelRef.value.length = 0
    } else if (isObject(modelRef.value)) {
      for (const key in modelRef.value) {
        delete modelRef.value[key]
      }
    }

    // modelRef.value = model()
    Object.assign(modelRef.value, model())
  }

  const validate = async () => {
    let ready = true

    if (validator) {
      try {
        await validator()
      } catch (err) {
        ready = false
      }
    }

    return ready
  }

  const handleSubmit = async () => {
    const validateRes = await validate()

    // 未准备好
    if (!validateRes) return

    request.run?.(modelRef.value)
  }

  return {
    ...request,
    submit: {
      modelRef,
      handleSubmit,
      handleReset: resetFields,
      resetFields,
    },
  }
}
