import { FormInst, FormRules } from 'naive-ui'
import { useSubmit } from '@/hooks/use-submit'

const rules: FormRules = {
  id: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur'],
  },
}

interface UserInfo {
  id: number
  name: string
  age: number
}

interface Input {
  id?: number
  age?: number
}

const studentsList: UserInfo[] = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '张三', age: 19 },
  { id: 3, name: '张三', age: 20 },
  { id: 4, name: '张三', age: 21 },
  { id: 5, name: '张三', age: 22 },
  { id: 6, name: '张三', age: 23 },
  { id: 7, name: '张三', age: 24 },
  { id: 7, name: '张三', age: 25 },
  { id: 9, name: '张三', age: 26 },
  { id: 10, name: '张三', age: 27 },
  { id: 11, name: '张三2', age: 18 },
  { id: 12, name: '张三', age: 19 },
  { id: 13, name: '张三', age: 20 },
  { id: 14, name: '张三', age: 21 },
  { id: 15, name: '张三', age: 22 },
  { id: 16, name: '张三', age: 23 },
  { id: 17, name: '张三', age: 24 },
  { id: 18, name: '张三', age: 25 },
  { id: 19, name: '张三', age: 26 },
  { id: 20, name: '张三', age: 27 },
]

type PaginationResult = { records: UserInfo[] }

function getData(input: Input): Promise<PaginationResult> {
  const { id, age } = input

  const res = studentsList
    .filter((d) => (id === undefined ? true : id === d.id))
    .filter((d) => (age === undefined ? true : age === d.age))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        records: res,
      })
    }, 1000)
  })
}

export const UseSubmitTest = defineComponent({
  setup() {
    const formInstRef = ref<FormInst | null>(null)

    const idTemp = ref<number | null>(null)

    const {
      loadingRef,
      dataRef,
      submit: { handleSubmit, handleReset, modelRef },
    } = useSubmit(
      async (model) => {
        const res = await getData({
          id: model.id ? parseInt(model.id.toString()) : undefined,
        } as Input)

        return res
      },
      {
        model: () => ({ id: idTemp.value } as Input),
        validator: () => formInstRef.value?.validate(),
      }
    )

    return () => (
      <div>
        <div class='un-text-20px'>useSubmit测试</div>
        <NForm
          ref={formInstRef}
          rules={rules}
          model={modelRef.value}
          labelPlacement='left'
          labelWidth='90px'
          requireMarkPlacement='left'
        >
          <div class='un-grid un-gap-x-12px un-grid-cols-2 un-pt-12px un-px-12px'>
            <NFormItem label='idTemp:'>
              <NInput v-model:value={idTemp.value} />
            </NFormItem>
            <NFormItem label='id:' path='id'>
              <NInput
                v-model:value={modelRef.value.id}
                placeholder='idTemp中的值在重置之后会被赋予id'
              />
            </NFormItem>
            <NFormItem label='炉次号:'>
              <NInput />
            </NFormItem>
          </div>
        </NForm>
        <NSpace>
          <NButton
            type='primary'
            loading={loadingRef.value}
            onClick={handleSubmit}
          >
            提交
          </NButton>
          <NButton onClick={handleReset}>重置</NButton>
          {dataRef.value?.records.length !== undefined && (
            <>共查询出：{dataRef.value?.records.length} 条数据</>
          )}
        </NSpace>
      </div>
    )
  },
})
