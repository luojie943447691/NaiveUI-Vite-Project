export interface DefineMenu {
  path: string
  name?: string
  redirect?: string
  access?: boolean | ((args: any) => boolean)
  children?: DefineMenu[]
}

const menus: DefineMenu[] = [
  {
    path: '/',
    redirect: '/test-page',
    access: true,
    children: [
      {
        path: 'test-page-two',
      },
    ],
  },
]

export default menus
