import {
  addCombinationKeycode,
  AddCombinationKeycodeOption,
  CombinationsTuple,
  UserCombination,
} from './combinationKeycode'

export function useCombinationKeycode(
  userCombinations: UserCombination<CombinationsTuple>[],
  options?: AddCombinationKeycodeOption
) {
  const { removeEventListener, addEventListener } = addCombinationKeycode(
    userCombinations,
    options
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
