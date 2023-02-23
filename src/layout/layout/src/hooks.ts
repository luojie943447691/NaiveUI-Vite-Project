import { DefineMenu } from '@/runtime/defineMenus'
import { COLLAPSED_KEY, CURRENT_MENU_KEY } from './constants'

export function useSiderCollapsed() {
  return inject(COLLAPSED_KEY) as Ref<boolean>
}

export function useCurrentMenu() {
  return inject(CURRENT_MENU_KEY) as Ref<DefineMenu | undefined>
}
