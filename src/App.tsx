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

    return () =>
      isReadyRef.value && (
        <NConfigProvider
          theme={theme.value}
          locale={zhCN}
          dateLocale={dateZhCN}
        >
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
