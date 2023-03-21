import {
  generateCombinationKeycode,
  UserCombinations,
} from './combinationKeycode'

type Options<T> = {
  keyCode: () => T
}

export const Obj: Record<string, unknown> = {
  shift: 0,
  ctrl: 1,
  s: 2,
  a: 3,
}

export function useCombinationKeycode<T>(
  userCombinations: UserCombinations<keyof T>,
  options?: Options<T>
) {
  const { keyCode = () => Obj } = options ?? {}

  const addCombinationKeycode = generateCombinationKeycode(
    keyCode() as Record<string, unknown>
  )

  const { removeEventListener, addEventListener } = addCombinationKeycode(
    userCombinations as UserCombinations<string>
    // options
  )

  onMounted(() => {
    addEventListener()
  })

  onBeforeUnmount(() => {
    removeEventListener()
  })

  return {
    removeEventListener,
  }
}
