import { DefineMenu } from '@/runtime/defineMenus'

// 只要子菜单的 map
export function allSubtreeToMap(
  menus: DefineMenu[],
  res: Record<string, DefineMenu[] | DefineMenu> = {}
) {
  menus.forEach((item) => {
    if (item.children) {
      allSubtreeToMap(item.children, res)
      //   res[item.path] = item.children
    } else {
      res[item.path] = item
    }
  })

  return res
}
