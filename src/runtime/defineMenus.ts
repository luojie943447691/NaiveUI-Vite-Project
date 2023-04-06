import { useAccessState } from '@/router/src/useAccess'
import { AccessState } from './defineAccessState'

export interface DefineMenu {
  path: string
  name?: string
  redirect?: string
  access?: (args: any) => boolean
  /**
   * 用于不在菜单中，但是需要激活菜单的路由
   */
  activeMenu?: string
  children?: DefineMenu[]
}

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
        path: '/system-one/request',
        name: 'useRequest测试',
      },
      {
        path: '/system-one/page-son-three',
        name: 'nginx测试菜单',
      },
      {
        path: '/system-one/keybord',
        name: '快捷键测试',
      },
      {
        path: '/system-one/test-developer',
        name: '测试发布',
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
  {
    path: '/svg',
    name: 'svg学习菜单',
    children: [
      {
        path: '/svg/property',
        name: 'svg的属性',
      },
      {
        path: '/svg/property',
        name: 'svg的属性',
      },
    ],
  },
]

export default function defineMenus() {
  return menus
}
