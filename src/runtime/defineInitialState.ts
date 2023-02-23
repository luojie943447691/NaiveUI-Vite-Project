interface SysPermission {
  page: string
  access: boolean
}

const getMenus = () => {
  return new Promise<SysPermission[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          page: 'test-page-two1',
          access: true,
        },
        {
          page: 'test-page-two',
          access: true,
        },
        {
          page: '/test-page1',
          access: true,
        },
      ])
    }, 1000)
  })
}

export default async function defineInitialState() {
  return (await Promise.allSettled([getMenus()]))
    .map((d) => (d.status === 'fulfilled' && d.value) || null)
    .filter(Boolean)
}

type InitialStateResult = ReturnType<typeof defineInitialState>

export type InitialState = InitialStateResult extends Promise<infer P>
  ? P
  : never
