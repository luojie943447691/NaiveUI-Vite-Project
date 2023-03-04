import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <NButton onClick={handleHideSider}>隐藏边框(主1-子3)</NButton>
      </div>
    )
  },
})
