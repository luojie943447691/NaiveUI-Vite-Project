import _ from 'lodash'
import { Slots } from 'vue'
import { useRoute } from 'vue-router'
import {
  pushTemporaryMenus,
  useTemporaryMenus,
} from '@/router/src/useTemporaryMenus'
import { DefineMenu } from '@/runtime/defineMenus'
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
  const temporaryMenusRef = useTemporaryMenus()

  // 当前激活的菜单
  const currentMenuRef = computed(() => {
    const path = route.path

    // 优先查找菜单
    const result = treeFind(
      [...menus.value, ...temporaryMenusRef.value],
      'children',
      (item) => item.path === path
    )

    // 如果没有找到，就往临时菜单里面添加，并返回这个临时菜单
    if (!result) {
      const { params, meta } = route

      const newMenu: DefineMenu = {
        path: route.path,
        activeMenu: (meta['activeMenu'] as string) ?? '',
      }

      // 如果有tabName
      if (meta['tabName']) {
        let compiled = _.template(meta['tabName'] as string)

        newMenu.name = compiled({
          tab: {
            tabName: `${params['id']}的信息`,
          },
        })
      }

      pushTemporaryMenus(newMenu)

      return newMenu
    }

    return result
  })

  provide(CURRENT_MENU_KEY, currentMenuRef)

  // 如果后续还需要做激活菜单的操作就在这里
  watchEffect(() => {
    const currentMenu = currentMenuRef.value
  })

  return layoutInfoRef
}
