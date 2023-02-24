import { Nullable } from '@/types'
import { isFunction } from '../is'

export function treeFilter<T extends { chidren: Nullable<T[]> }>(
  tree: Nullable<T[]>,
  predicate: (item: T) => unknown
): T[]

export function treeFilter<T extends { [key in C]?: T[] }, C extends keyof T>(
  tree: Nullable<T[]>,
  children: C,
  predicate: (item: T) => unknown
): T[]

export function treeFilter<T extends { [key in C]?: T[] }, C extends keyof T>(
  tree: Nullable<T[]>,
  // children: C,
  // predicate: (item: T) => unknown
  ...args: any[]
) {
  if (!tree) return []
  let children: C
  let predicate: (item: T) => unknown

  if (args.length === 1) {
    if (isFunction(args[0])) {
      predicate = args[0]
    } else {
      children = args[0]
    }
  } else {
    children = args[0]
    predicate = args[1]
  }

  return tree
    .map((item) => {
      if (item[children]) {
        const newChildren = treeFilter(
          item[children] as unknown as T[],
          children,
          predicate
        )

        if (newChildren.length) {
          return { ...item, [children]: newChildren }
        }
      }

      if (predicate(item)) {
        const newItem = { ...item }
        delete newItem[children]

        return newItem
      }
    })
    .filter(Boolean) as T[]
}
