import { useRoute, useRouter } from 'vue-router'
import { useCurrentMenu } from '@/layout/layout/src/hooks'

interface TabsType {
  name: string
  path: string
}

interface LocalPageInfo {
  activePath: string
  tabs: TabsType[]
}

export const LayoutTabs = defineComponent({
  setup() {
    const localOpenMenus = JSON.parse(
      localStorage.getItem('LOCAL_PAGE_DATA') ?? '{}'
    ) as LocalPageInfo

    const route = useRoute()
    const router = useRouter()
    const allTabsRef = ref<TabsType[]>(localOpenMenus.tabs ?? [])
    const currentMenuRef = useCurrentMenu()

    // 选中
    const currentTab = ref(
      localOpenMenus.activePath ?? currentMenuRef.value?.path
    )

    watch(
      currentMenuRef,
      (currentMenu) => {
        const path = currentMenu?.path
        if (!path) return
        if (currentMenu.redirect) return

        const index = allTabsRef.value.findIndex((m) => m.path === path)

        if (index === -1) {
          if (allTabsRef.value.length >= 5) {
            allTabsRef.value.shift()
          }

          const pushData = {
            path: currentMenu.path ?? '',
            name: currentMenu.name ?? '无标题',
          }

          allTabsRef.value.push(pushData)

          localStorage.setItem(
            'LOCAL_PAGE_DATA',
            JSON.stringify({
              activePath: route.path,
              tabs: allTabsRef.value,
            })
          )
        }

        nextTick().then(() => {
          currentTab.value = path
        })
      },
      {
        immediate: true,
      }
    )

    // 处理菜单变化
    // const handleTabChange = () => { }

    // tabChange
    const handleTabUpdate = (value: string) => {
      currentTab.value = value

      router.push({
        path: value,
      })
    }

    return () => (
      <NTabs
        style={{
          height: 'var(--page-tabs-height)',
        }}
        value={currentTab.value}
        onUpdateValue={handleTabUpdate}
      >
        {{
          default: () => (
            <>
              {allTabsRef.value.map((item) => {
                return (
                  <NTab key={item.path} name={item.path}>
                    {{ default: () => item.name }}
                  </NTab>
                )
              })}
            </>
          ),
        }}
      </NTabs>
    )
  },
})
