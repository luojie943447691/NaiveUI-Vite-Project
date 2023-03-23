import { DefineMenu } from '../../runtime/defineMenus'

const temporaryMenusRef = ref<DefineMenu[]>([])

export function setTemporaryMenus(menus: DefineMenu[]) {
  temporaryMenusRef.value = menus
}

export function pushTemporaryMenus(menu: DefineMenu) {
  temporaryMenusRef.value?.push(menu)
}

export function useTemporaryMenus() {
  return temporaryMenusRef
}
