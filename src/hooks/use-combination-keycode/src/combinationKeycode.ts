import {
  AddCombinationKeycodeOption,
  CombinationsTuple,
  UserCombination,
} from './types'

export function addCombinationKeycode(
  userCombinations: UserCombination<CombinationsTuple>[],
  options?: AddCombinationKeycodeOption
) {
  const { ms = 300, target = document } = options ?? {}
  let multiKeycode: Set<string> = new Set([])

  let firstTime = 0
  let timer = null

  const fn = (e: KeyboardEvent) => {
    // e.preventDefault()
    let currentTime = Date.now()

    userCombinations.forEach(async (item) => {
      timer = setTimeout(() => {
        firstTime = 0
        multiKeycode.clear()
      }, ms)

      if (firstTime === 0) {
        firstTime = currentTime
        multiKeycode.add(e.key)
      } else if (currentTime - firstTime > ms) {
        clearTimeout(timer)
      } else {
        multiKeycode.add(e.key)
      }

      const userKeycodeCombination = Array.from(multiKeycode)
        .sort()
        .join(',')
        .toLowerCase()

      const expectKeycodeCombination = item.keycodeCombination
        .split('+')
        .map((d) => d.trim())
        .sort()
        .join(',')
        .toLowerCase()

      if (userKeycodeCombination === expectKeycodeCombination) {
        await item.keyboardResponse()
      }
    })
  }

  const addKeyboardEventListener = () => {
    target.addEventListener('keydown', fn)
  }

  const removeKeyboardEventListener = () => {
    target.removeEventListener('keydown', fn)
  }

  return {
    addKeyboardEventListener,
    removeKeyboardEventListener,
  }
}
