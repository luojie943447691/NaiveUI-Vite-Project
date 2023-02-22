import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import IconSvg from '@/assets/vue.svg'
import Layout from './layout'

export default defineComponent({
  setup() {
    const theme = computed(() => {
      const localTheme = window.localStorage.getItem('theme') ?? 'lightTheme'

      if (!localTheme) {
        window.localStorage.setItem('theme', 'lightTheme')
      }

      return localTheme === 'lightTheme' ? null : darkTheme
    })

    return () => (
      <NConfigProvider theme={theme.value} locale={zhCN} dateLocale={dateZhCN}>
        <Layout />
      </NConfigProvider>
    )
  },
})
