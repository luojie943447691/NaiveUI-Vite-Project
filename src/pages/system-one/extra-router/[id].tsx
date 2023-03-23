/*
route

name: user-info
meta:
  activeMenu: "/system-one/page-son-one"
  tabName: "<%= tab.tabName %>"
*/
import { useRoute } from 'vue-router'

const ExtraRouter = defineComponent({
  setup() {
    const route = useRoute()

    const t = computed(() => {
      return route.params.id
    })

    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <h1 class='un-m-0'>这是{t.value}的信息</h1>
      </div>
    )
  },
})

export default ExtraRouter
