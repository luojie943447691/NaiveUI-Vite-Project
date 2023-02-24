import { DefineMenu } from '@/runtime/defineMenus'
import { COLLAPSED_KEY, CURRENT_MENU_KEY, LAYOUT_INTO_KEY } from './constants'
import { LayoutInfo } from './types'

export function useLayoutInfo() {
  return inject(LAYOUT_INTO_KEY) as Ref<LayoutInfo>
}

export function useSiderCollapsed() {
  return inject(COLLAPSED_KEY) as Ref<boolean>
}

export function useCurrentMenu() {
  return inject(CURRENT_MENU_KEY) as Ref<DefineMenu | undefined>
}
