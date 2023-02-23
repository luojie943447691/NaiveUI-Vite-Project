import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    return () => <NButton onClick={handleHideSider}>隐藏边框(主2-子1)</NButton>
  },
})
