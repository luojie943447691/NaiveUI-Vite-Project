import { addCombinationKeycode } from './combinationKeycode'
import {
  AddCombinationKeycodeOption,
  CombinationsTuple,
  UserCombination,
} from './types'

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
