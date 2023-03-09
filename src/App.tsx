import { debounce } from 'lodash'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NaiveUIProvider } from './common/components/NaiveUIProvider'
import useRequest from './hooks/use-request'
import { RLayout } from './layout/layout'
// import postStudentList from './request/postTest'
import getStudentList from './request/test'

const RLayoutTabs = defineAsyncComponent(() => import('./layout/layout-tabs'))

const postStudentList = () => {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => {
      console.log('请求中...')

      resolve({
        data: [
          {
            id: 1,
            name: '张三',
          },
        ],
      })
    }, 1000)
  })
}

export default defineComponent({
  setup() {
    const isReadyRef = ref()
    const router = useRouter()

    router.isReady().then(() => {
      isReadyRef.value = true
    })

    const theme = computed(() => {
      const localTheme = window.localStorage.getItem('theme') ?? 'lightTheme'

      if (!localTheme) {
        window.localStorage.setItem('theme', 'lightTheme')
      }

      return localTheme === 'lightTheme' ? null : darkTheme
    })

    const debounceWaitRef = ref(3000)

    // 测试  request
    const { loadingRef, dataRef, cancel, run, runAsync } = useRequest(
      async () => {
        const id = Math.ceil(Math.random() * 3)

        const res = await getStudentList({ id: 2 })

        // console.log('res', res)

        return res.data
      },
      {
        manual: true,
        get debounceWait() {
          return debounceWaitRef.value
        },
        // ready: () => false,
        // loadingDelay: 500,
        // get pollingErrorRetryCount() {
        //   return pollingErrorRetryCountRef.value
        // },
        // pollingInterval: 3000,
      }
    )

    return () =>
      isReadyRef.value && (
        <NConfigProvider
          theme={theme.value}
          locale={zhCN}
          dateLocale={dateZhCN}
        >
          <h1>
            标题：
            {loadingRef.value ? '加载中...' : ''}
            {dataRef.value?.[0].name}
          </h1>
          <NButton
            onClick={() => {
              cancel()
            }}
          >
            取消
          </NButton>
          <NButton
            onClick={() => {
              run()
            }}
          >
            发送请求
          </NButton>
          <NButton
            onClick={() => {
              debounceWaitRef.value = 1000
            }}
          >
            修改条件
          </NButton>
          <NaiveUIProvider>
            <RLayout>
              {{
                header: () => '这是header',
                tabs: () => <RLayoutTabs />,
              }}
            </RLayout>
          </NaiveUIProvider>
        </NConfigProvider>
      )
  },
})
