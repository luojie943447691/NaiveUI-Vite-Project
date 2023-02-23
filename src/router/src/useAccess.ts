import { AccessState } from '@/runtime/defineAccessState'

const accessStateRef = ref<AccessState | null>()

export function setAccessState(state: AccessState | null) {
  accessStateRef.value = state ? markRaw(state) : state
}

export function useAccessState() {
  return accessStateRef
}
