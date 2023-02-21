import { defineComponent } from "vue";
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import Layout from './layout'
import { useRouter } from "vue-router";


export default defineComponent({
  setup() {
    const theme = computed(() => {
      const localTheme = window.localStorage.getItem("theme") ?? "lightTheme"
      if (!localTheme) {
        window.localStorage.setItem("theme", "lightTheme")
      }

      return localTheme === "lightTheme" ? null : darkTheme
    })
    return () => (
      <NConfigProvider theme={theme.value} locale={zhCN} dateLocale={dateZhCN}>
        <Layout></Layout>
      </NConfigProvider>
    )
  }
})