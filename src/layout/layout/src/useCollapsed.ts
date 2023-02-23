import { COLLAPSED_KEY } from './constants'

export function useCollapsed() {
  const collapsedRef = ref<boolean>(false)

  provide(COLLAPSED_KEY, collapsedRef)

  return collapsedRef
}
