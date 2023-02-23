import { Nullable } from '../../types'

export function treeFind<T extends { [K in C]: T[K] }, C extends keyof T>(
  tree: Nullable<T[]>,
  children: C,
  predicate: (item: T) => unknown
): T | undefined {
  if (!tree) return

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i]

    if (predicate(item)) {
      return item
    }

    if (item[children]) {
      const res = treeFind(item[children], children, predicate)

      if (res) return res
    }
  }
}
