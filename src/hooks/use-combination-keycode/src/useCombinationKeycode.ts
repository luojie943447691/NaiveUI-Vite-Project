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
  const { removeKeyboardEventListener, addKeyboardEventListener } =
    addCombinationKeycode(userCombinations, options)

  onMounted(() => {
    addKeyboardEventListener()
  })

  onBeforeUnmount(() => {
    removeKeyboardEventListener()
  })

  return {
    removeEventListener,
  }
}
