import { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'

const loadingBarRef = ref<LoadingBarApiInjection>()

export function setLoadingBar(loadingBar: LoadingBarApiInjection) {
  loadingBarRef.value = loadingBar
}

export function useSelfLoadingBar() {
  return loadingBarRef
}
