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

const options = [
  {
    label: '关闭当前',
    key: 'closeCurrent',
  },
  {
    label: '关闭其他',
    key: 'closeOther',
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
  },
  {
    label: '关闭左侧',
    key: 'closeLeft',
  },
]

// 找到指定

export const LayoutTabs = defineComponent({
  setup() {
    console.log('组件执行了初始化')

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
        }

        nextTick().then(() => {
          currentTab.value = path
        })
      },
      {
        immediate: true,
      }
    )

    watch(
      () => allTabsRef.value,
      (allTabs) => {
        localStorage.setItem(
          'LOCAL_PAGE_DATA',
          JSON.stringify({
            activePath: route.path,
            tabs: allTabs,
          })
        )
      },
      {
        immediate: true,
        deep: true,
      }
    )

    // 处理菜单关闭
    const handleTabClose = (value: string) => {
      const allTabs = allTabsRef.value
      const index = allTabs.findIndex((d) => d.path === value)
      let willCheckedTabsType: TabsType | null = null

      // 判断是否是当前激活的
      if (value === currentMenuRef.value?.path) {
        // 判断是否是最后一个，最后一个的话就进入前一个 tab 的路由，否则就是后一个
        if (index === allTabs.length - 1) {
          willCheckedTabsType = allTabs[index - 1]
          allTabsRef.value.pop()
        } else {
          willCheckedTabsType = allTabs[index + 1]
          allTabsRef.value.splice(index, 1)
        }

        router.push(willCheckedTabsType.path)
      } else {
        allTabsRef.value.splice(index, 1)
      }
    }

    // 右键菜单相关
    const showDropdownRef = ref(false)
    const rightKeyCheckedPathRef = ref()
    const xRef = ref(0)
    const yRef = ref(0)

    const handleSelect = (key: string) => {
      if (allTabsRef.value.length <= 1) return
      const rightKeyCheckedPath = rightKeyCheckedPathRef.value
      const currentMenuPath = currentMenuRef.value?.path

      const closeMenuIndex = allTabsRef.value.findIndex(
        (d) => d.path === rightKeyCheckedPath
      )

      const activeMenuIndex = allTabsRef.value.findIndex(
        (d) => d.path === currentMenuPath
      )

      if (closeMenuIndex === -1) return

      switch (key) {
        case 'closeCurrent': {
          handleTabClose(rightKeyCheckedPath)

          break
        }

        case 'closeOther': {
          allTabsRef.value = [allTabsRef.value[closeMenuIndex]]

          if (currentMenuPath !== rightKeyCheckedPath) {
            router.push(rightKeyCheckedPath)
          }

          break
        }

        case 'closeRight': {
          allTabsRef.value = allTabsRef.value.slice(0, closeMenuIndex + 1)

          // 如果关闭的 tab 在激活的 tab 的左侧，则需要做调整，即跳转路由
          if (closeMenuIndex < activeMenuIndex) {
            router.push(rightKeyCheckedPath)
          }

          break
        }

        case 'closeLeft': {
          allTabsRef.value = allTabsRef.value.slice(closeMenuIndex)

          // 如果关闭的 tab 在激活的 tab 的右侧，则需要做调整，即跳转路由
          if (closeMenuIndex > activeMenuIndex) {
            router.push(rightKeyCheckedPath)
          }

          break
        }
      }

      showDropdownRef.value = false
    }

    // tabChange
    const handleTabUpdate = (value: string) => {
      currentTab.value = value

      router.push({
        path: value,
      })
    }

    return () => (
      <>
        <NTabs
          style={{
            height: 'var(--page-tabs-height)',
          }}
          value={currentTab.value}
          onUpdateValue={handleTabUpdate}
          onClose={handleTabClose}
          type='card'
          closable={allTabsRef.value.length > 1}
        >
          {{
            default: () => (
              <>
                {allTabsRef.value.map((item) => {
                  return (
                    <NTabPane
                      key={item.path}
                      name={item.path}
                      tab={item.name}
                      tabProps={{
                        onContextmenu(e) {
                          e.preventDefault()

                          rightKeyCheckedPathRef.value = (
                            e.currentTarget as HTMLElement
                          ).dataset.name

                          xRef.value = e.pageX
                          yRef.value = e.pageY
                          showDropdownRef.value = true
                        },
                      }}
                    />
                  )
                })}
              </>
            ),
          }}
        </NTabs>
        <NDropdown
          placement='bottom-start'
          trigger='manual'
          x={xRef.value}
          y={yRef.value}
          options={options}
          show={showDropdownRef.value}
          onClickoutside={() => (showDropdownRef.value = false)}
          onSelect={handleSelect}
        />
      </>
    )
  },
})
