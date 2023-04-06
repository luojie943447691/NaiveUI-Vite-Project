import { MaybePromise } from '@/utils/types'
import { ModifierKeys } from './constants'

// 实现 Combs
export type Combinations<T> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} + ${R[number]}` | Combinations<R>
  : never

export type CombinationsTuple = Combinations<ModifierKeys>

export interface UserCombination<T> {
  keyboardResponse: (...args: any[]) => MaybePromise<any>
  keycodeCombination: T
}

export interface AddCombinationKeycodeOption {
  ms?: number
  target?: Document
}
