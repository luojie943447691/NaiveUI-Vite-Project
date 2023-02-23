import { InitialState } from './defineInitialState'

export function defineAccessState([menu]: InitialState) {
  const menuMap: Record<string, boolean> = {}

  menu?.forEach(({ page }) => {
    menuMap[page] = true
  })

  return {
    menuMap,
  }
}

export type AccessState = ReturnType<typeof defineAccessState>
