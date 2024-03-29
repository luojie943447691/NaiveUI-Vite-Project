import { Router } from 'vue-router'
import { useSelfLoadingBar } from '@/common/hooks/useLoadingBar'
import { AccessState } from '@/runtime/defineAccessState'
import { InitialState } from '@/runtime/defineInitialState'
import { DefineMenu } from '@/runtime/defineMenus'
import { Nullable } from '../../types'
import { MenuToMap } from './MenuToMap'
import { setAccessState } from './useAccess'
import { setMenus } from './useMenus'

interface PatchRouterOption {
  defineMenus(): DefineMenu[]
  defineAccessState(
    initialState: InitialState | null
  ): AccessState | Promise<AccessState>
  defineInitialState: () => InitialState | Promise<InitialState>
}

export function PatchRouter(options: PatchRouterOption) {
  const { defineMenus, defineAccessState, defineInitialState } = options
  let accessState: Nullable<AccessState>
  let initialState: Nullable<InitialState>
  let menus: Nullable<DefineMenu[]>
  let isFistLogin = true
  const loadingBarRef = useSelfLoadingBar()

  return (router: Router) => {
    router.beforeEach(async (to, from) => {
      loadingBarRef.value?.start()

      if (defineMenus && !menus) {
        menus = defineMenus()
        setMenus(menus)
      }

      if (defineInitialState && !initialState) {
        initialState = await defineInitialState()
        accessState = await defineAccessState(initialState)
        setAccessState(accessState)
      }

      const menuMap = MenuToMap(menus)

      const curMenu = menuMap[to.path]

      if (to.path === '/' && curMenu && curMenu['redirect'] && isFistLogin) {
        isFistLogin = false

        return {
          path: curMenu['redirect'],
          replace: true,
        }
      }
    })

    router.afterEach(() => {
      // console.log('结束了')
      loadingBarRef.value?.finish()
    })
  }
}
