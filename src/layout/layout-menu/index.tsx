import {
  MenuInst,
  MenuMixedOption,
  MenuOption,
} from 'naive-ui/es/menu/src/interface'
import { RouterLink } from 'vue-router'
import { useAccessState } from '@/router/src/useAccess'
import { treeFilter } from '@/utils/tree/treeFilter'
import { useMenus } from '../../router/src/useMenus'
import { DefineMenu } from '../../runtime/defineMenus'
import { treeForEach } from '../../utils'
import { useCurrentMenu } from '../layout/src/hooks'
import { useCollapsed } from '../layout/src/useCollapsed'
import { treeToMap } from './treeToMap'

export const LayoutMenu = defineComponent({
  setup(props, { slots }) {
    const collapsedRef = useCollapsed()
    const menus = useMenus()
    const accessStateRef = useAccessState()
    const currentMenuRef = useCurrentMenu()
    const menuInstRef = ref<MenuInst | null>(null)

    const viewMenus = computed(() => {
      // 找到所有有孩子节点的菜单
      const leafMenus: DefineMenu[] = []

      treeForEach(
        menus.value,
        'children',
        (item) => item.children && leafMenus.push(item)
      )

      const leafMenusMap = treeToMap(leafMenus)

      const filterMunes = treeFilter(
        leafMenus,
        'children',
        (d) =>
          leafMenusMap[d.path] && (!d.access || d?.access(accessStateRef.value))
      )

      return filterMunes
    })

    // 处理 label 选中
    const hendleRenderLabel = (option: MenuOption) => {
      // 如果有孩子节点
      if (option.children) {
        return option.name as string
      }

      return <RouterLink to={option.path as string}>{option.name}</RouterLink>
    }

    const curKeyMenu = computed(() => {
      const currentMenu = currentMenuRef.value
      menuInstRef.value?.showOption(currentMenu?.path)

      return currentMenu?.path
    })

    return () => (
      <NMenu
        ref={menuInstRef}
        collapsed={collapsedRef.value}
        collapsedWidth={64}
        collapsedIconSize={20}
        options={viewMenus.value as unknown as MenuMixedOption[]}
        labelField='name'
        keyField='path'
        renderLabel={hendleRenderLabel}
        defaultValue={curKeyMenu.value}
        value={curKeyMenu.value}
      />
    )
  },
})
