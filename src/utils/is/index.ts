function toString(value: any) {
  return Object.prototype.toString.call(value)
}

type isReturnType =
  | 'object'
  | 'function'
  | 'array'
  | 'number'
  | 'string'
  | 'date'
  | 'set'

function is(source: string): isReturnType {
  return source.slice(8, -1) as isReturnType
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

export function isNullable(value: any): value is null | undefined {
  return value === null || value === undefined
}
