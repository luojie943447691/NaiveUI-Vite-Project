import { useLoadingBar } from 'naive-ui'
import { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'

const loadingBar = useLoadingBar()

export function LoadingBarStart() {
  loadingBar.start()
}

export function LoadingBarFinish() {
  loadingBar?.finish()
}
