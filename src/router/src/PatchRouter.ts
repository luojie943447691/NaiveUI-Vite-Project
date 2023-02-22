import { Router } from 'vue-router'
import { DefineMenu } from '../../runtime/defineMenus'
import { MenuToMap } from './MenuToMap'
import { setMenus } from './useMenus'

interface PatchRouterOption {
  menus?: DefineMenu[]
}

export function PatchRouter(options?: PatchRouterOption) {
  const { menus } = options || {}
  console.log('menus', menus)

  if (menus) {
    setMenus(menus)
  }

  const menuMap = MenuToMap(menus)

  let isFistLogin = true

  return (router: Router) => {
    router.beforeEach((to, from) => {
      console.log('to', to)
      console.log('from', from)

      if (
        from.path === '/' &&
        menuMap['/'] &&
        menuMap['/']['redirect'] &&
        isFistLogin
      ) {
        isFistLogin = false

        return {
          path: menuMap['/']['redirect'],
          replace: true,
        }
      }
    })

    router.afterEach(() => {
      console.log('结束了')
    })
  }
}
