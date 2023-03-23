import { DefineMenu } from '../../runtime/defineMenus'

const menusRef = ref<DefineMenu[]>([])

export function setMenus(menus: DefineMenu[]) {
  menusRef.value = menus
}

export function useMenus() {
  return menusRef
}
