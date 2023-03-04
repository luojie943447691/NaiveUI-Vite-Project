import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NaiveUIProvider } from './common/components/NaiveUIProvider'
import useRequest from './hooks/use-request'
import { RLayout } from './layout/layout'
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

    // 测试  request
    const { loadingRef } = useRequest(
      async (id: number) => {
        const res = await getStudentList({
          id: id,
        })

        // console.log('res', res)

        return res.data
      },
      {
        defaultParams: [1],
      }
    )

    return () =>
      isReadyRef.value && (
        <NConfigProvider
          theme={theme.value}
          locale={zhCN}
          dateLocale={dateZhCN}
        >
          <h1>{loadingRef.value ? '加载中...' : '完成了'}</h1>
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
