interface SysPermission {
  page: string
  access: boolean
}

const getMenus = () => {
  return new Promise<SysPermission[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          page: '/system-one/page-son-one',
          access: true,
        },
        {
          page: '/system-two/page-son-two',
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
