import { Nullable } from '../../types'

export function treeForEach<T extends { [K in C]?: T[] }, C extends keyof T>(
  tree: Nullable<T[]>,
  children: C,
  callback: (item: T) => unknown
): void {
  const fn = (tree: Nullable<T[]>) => {
    tree?.forEach((item) => {
      callback(item)
      fn(item[children])
    })
  }

  fn(tree)
}
