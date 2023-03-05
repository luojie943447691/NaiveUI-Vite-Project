import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NaiveUIProvider } from './common/components/NaiveUIProvider'
import useRequest from './hooks/use-request'
import { RLayout } from './layout/layout'
import postStudentList from './request/postTest'
import getStudentList from './request/test'

const RLayoutTabs = defineAsyncComponent(() => import('./layout/layout-tabs'))

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

    const pollingErrorRetryCountRef = ref(2)

    // 测试  request
    const { loadingRef, dataRef, cancel, run, runAsync } = useRequest(
      async () => {
        const id = Math.ceil(Math.random() * 3)

        const res = await postStudentList({
          id: id,
        })

        // console.log('res', res)

        return res.data
      },
      {
        // ready: () => false,
        loadingDelay: 500,
        get pollingErrorRetryCount() {
          return pollingErrorRetryCountRef.value
        },
        pollingInterval: 3000,
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
            {loadingRef.value
              ? '加载中...'
              : `完成了${dataRef.value?.[0].name}`}
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
            继续
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
