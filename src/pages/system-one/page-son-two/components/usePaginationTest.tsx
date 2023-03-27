import { DataTableColumns } from 'naive-ui'
import { usePagination } from '@/hooks/use-pagination'

interface UserInfo {
  id: number
  name: string
  age: number
}

interface QueryModel {
  id?: number
}

interface UserInfoQuery {
  id?: number
}

interface Input {
  current: number
  pageSize: number
  query: UserInfoQuery
}

const studentsList: UserInfo[] = [
  { id: 1, name: '张三', age: 18 },
  { id: 1, name: '张三', age: 19 },
  { id: 1, name: '张三', age: 20 },
  { id: 1, name: '张三', age: 21 },
  { id: 1, name: '张三', age: 22 },
  { id: 1, name: '张三', age: 23 },
  { id: 1, name: '张三', age: 24 },
  { id: 1, name: '张三', age: 25 },
  { id: 1, name: '张三', age: 26 },
  { id: 1, name: '张三', age: 27 },
  { id: 1, name: '张三2', age: 18 },
  { id: 1, name: '张三', age: 19 },
  { id: 1, name: '张三', age: 20 },
  { id: 1, name: '张三', age: 21 },
  { id: 1, name: '张三', age: 22 },
  { id: 1, name: '张三', age: 23 },
  { id: 1, name: '张三', age: 24 },
  { id: 1, name: '张三', age: 25 },
  { id: 1, name: '张三', age: 26 },
  { id: 1, name: '张三', age: 27 },
]

type PaginationResult = { total: number; records: UserInfo[] }

function getData(input: Input): Promise<PaginationResult> {
  const { pageSize, current } = input

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: studentsList.length / pageSize,
        records: studentsList.slice(
          pageSize * (current - 1),
          pageSize * current
        ),
      })
    }, 1000)
  })
}

export const UsePaginationTest = defineComponent({
  setup() {
    const idRef = ref(1)

    // 测试 usePagination
    const {
      loadingRef,
      cancel,
      pagination: {
        recordsRef,
        totalRef,
        currentRef,
        pageSizeRef,
        handleSubmit,
        resetFields,
        handleUpdatePage,
        handleUpdatePageSize,
      },
    } = usePagination(
      async ({ current, pageSize, query }) => {
        const data = await getData({ current, pageSize, query: {} })

        return data
      },
      {
        model: () => ({ id: idRef.value } as QueryModel),
        defaultPageSize: 5,
      }
    )

    const columns: DataTableColumns<UserInfo> = [
      {
        key: 'no',
        title: '序号',
        render: (row, index) => index + 1,
      },
      {
        key: 'name',
        title: '姓名',
      },
      {
        key: 'age',
        title: '岁数',
      },
    ]

    return () => (
      <div>
        <div class='un-text-20px'>usePagination测试</div>
        <NButton
          onClick={() => {
            cancel()
          }}
        >
          取消
        </NButton>
        <NButton
          onClick={() => {
            handleSubmit()
          }}
        >
          发送请求
        </NButton>
        <NButton
          onClick={() => {
            idRef.value = 3
            resetFields()
          }}
        >
          重置条件
        </NButton>
        <NDataTable
          loading={loadingRef.value}
          class='un-h-300px'
          flexHeight
          data={recordsRef?.value}
          columns={columns}
        />
        <div class='un-mt-12px un-flex un-justify-end'>
          <NPagination
            v-model:page={currentRef.value}
            pageCount={totalRef.value}
            pageSize={pageSizeRef.value}
            onUpdatePage={handleUpdatePage}
            onUpdatePageSize={handleUpdatePageSize}
            showSizePicker
          />
        </div>
      </div>
    )
  },
})
