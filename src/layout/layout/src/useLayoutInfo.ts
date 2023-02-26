import { Slots } from 'vue'
import { useRoute } from 'vue-router'
import { useMenus } from '../../../router/src/useMenus'
import { treeFind } from '../../../utils'
import { CURRENT_MENU_KEY, LAYOUT_INTO_KEY } from './constants'
import { LayoutInfo } from './types'

export function useLayoutInfo(options: { slots: Readonly<Slots> }) {
  const { slots } = options
  const href = window.location.href

  const isHideSider = /hide_sider=1/gi.test(href)
  const isHideTabs = /hide_tabs=1/gi.test(href)
  const isHideHeader = /hide_header=1/gi.test(href)

  const layoutInfoRef = ref<LayoutInfo>({
    hideSider: isHideSider,
    hideTabs: isHideTabs,
    hideHeader: isHideHeader,
  })

  provide(LAYOUT_INTO_KEY, layoutInfoRef)

  watchEffect(() => {
    const layoutInfo = layoutInfoRef.value

    document.documentElement.style.setProperty(
      '--layout-header-height',
      slots.header && !layoutInfo.hideHeader ? '56px' : '0px'
    )

    document.documentElement.style.setProperty(
      '--page-tabs-height',
      slots.tabs && !layoutInfo.hideTabs ? '40px' : '0px'
    )

    document.documentElement.style.setProperty(
      '--safe-area-inset-top',
      'calc(var(--layout-header-height) + var(--page-tabs-height))'
    )
  })

  const route = useRoute()
  const menus = useMenus()

  // 当前激活的菜单
  const currentMenuRef = computed(() => {
    const path = route.path

    return treeFind(menus.value, 'children', (item) => item.path === path)
  })

  provide(CURRENT_MENU_KEY, currentMenuRef)

  // 如果后续还需要做激活菜单的操作就在这里
  watchEffect(() => {
    const currentMenu = currentMenuRef.value
  })

  return layoutInfoRef
}
