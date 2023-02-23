import { Nullable } from '@/types'

// export function treeFilter<T extends { [key in C]?: T[] }, C extends keyof T>(
//   tree: Nullable<T[]>,
//   children: C,
//   predicate: (item: T) => unknown
// ): T[]

export function treeFilter<T extends { [key in C]?: T[] }, C extends keyof T>(
  tree: Nullable<T[]>,
  children: C,
  predicate: (item: T) => unknown
): T[] {
  if (!tree) return []

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
