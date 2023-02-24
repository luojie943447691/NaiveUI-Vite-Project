import { useAccessState } from '@/router/src/useAccess'
import { AccessState } from './defineAccessState'

export interface DefineMenu {
  path: string
  name?: string
  redirect?: string
  access?: (args: any) => boolean
  children?: DefineMenu[]
}

// const accessMap: Record<string, boolean> = {
//   'test-page-two1': true,
// }

const access = (accessStateKey: string) => (accessState: AccessState) =>
  accessState.menuMap[accessStateKey]

const menus: DefineMenu[] = [
  {
    path: '/',
    redirect: '/system-one/page-son-one',
  },
  {
    path: '/system-one',
    name: '主菜单1-有子菜单',
    children: [
      {
        path: '/system-one/page-son-one',
        name: '主菜单1-子菜单1',
      },
      {
        path: '/system-one/page-son-two',
        name: '主菜单1-子菜单2',
      },
      {
        path: '/system-one/page-son-three',
        name: '主菜单1-子菜单3',
      },
    ],
  },
  {
    path: '/system-two',
    name: '主菜单2-有子菜单',
    children: [
      {
        path: '/system-two/page-son-one',
        name: '主菜单2-子菜单1',
      },
      {
        path: '/system-two/page-son-two',
        name: '主菜单2-子菜单2',
      },
      {
        path: '/system-two/page-son-three',
        name: '主菜单2-子菜单3',
      },
    ],
  },
]

export default function defineMenus() {
  return menus
}
