import { Obj } from './useCombinationKeycode'

interface UserCombination<T> {
  do: (...args: any[]) => any
  keycodeCombination: T
}

export interface AddCombinationKeycodeOption {
  ms?: number
  target?: Document
}

export type UserCombinations<K> = UserCombination<K[]>[]

// 可以自定义
export function generateCombinationKeycode<T extends Record<string, unknown>>(
  keycode: T
) {
  return function addCombinationKeycode<K extends keyof typeof keycode>(
    userCombinations: UserCombinations<K>,
    options?: AddCombinationKeycodeOption
  ) {
    const { ms = 300, target = document } = options ?? {}
    let multiKeycode: Set<K> = new Set([])

    let firstTime = 0
    let timer = null

    const fn = (e: KeyboardEvent) => {
      e.preventDefault()
      let currentTime = Date.now()

      userCombinations.forEach((item) => {
        timer = setTimeout(() => {
          firstTime = 0
          multiKeycode.clear()
        }, ms)

        if (firstTime === 0) {
          firstTime = currentTime
          multiKeycode.add(e.key as K)
        } else if (currentTime - firstTime > ms) {
          clearTimeout(timer)
        } else {
          multiKeycode.add(e.key as K)
        }

        if (
          Array.from(multiKeycode).sort().join(',').toLowerCase() ===
          item.keycodeCombination.sort().join(',').toLowerCase()
        ) {
          item.do()
        }
      })
    }

    const addEventListener = () => {
      target.addEventListener('keydown', fn)
    }

    const removeEventListener = () => {
      target.removeEventListener('keydown', fn)
    }

    return {
      addEventListener,
      removeEventListener,
    }
  }
}

// export function addCombinationKeycode<K extends keyof typeof Keycode>(
//   userCombinations: UserCombinations<K>,
//   options?: AddCombinationKeycodeOption
// ) {
//   const { ms = 300, target = document } = options ?? {}
//   let multiKeycode: Set<K> = new Set([])

//   let firstTime = 0
//   let timer = null

//   const fn = (e: KeyboardEvent) => {
//     e.preventDefault()
//     let currentTime = Date.now()

//     userCombinations.forEach((item) => {
//       timer = setTimeout(() => {
//         firstTime = 0
//         multiKeycode.clear()
//       }, ms)

//       if (firstTime === 0) {
//         firstTime = currentTime
//         multiKeycode.add(e.key as K)
//       } else if (currentTime - firstTime > ms) {
//         clearTimeout(timer)
//       } else {
//         multiKeycode.add(e.key as K)
//       }

//       if (
//         Array.from(multiKeycode).sort().join(',').toLowerCase() ===
//         item.keycodeCombination.sort().join(',').toLowerCase()
//       ) {
//         item.do()
//       }
//     })
//   }

//   const addEventListener = () => {
//     target.addEventListener('keydown', fn)
//   }

//   const removeEventListener = () => {
//     target.removeEventListener('keydown', fn)
//   }

//   return {
//     addEventListener,
//     removeEventListener,
//   }
// }
