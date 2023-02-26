import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { NaiveUIProvider } from './common/components/NaiveUIProvider'
import { RLayout } from './layout/layout'

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
