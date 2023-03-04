import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    const inputRef = ref()

    return () => (
      <>
        <NButton onClick={handleHideSider}>
          隐藏边框(主2-子3) 不能 keepAlive
        </NButton>
        <NInput v-model={inputRef.value} />
      </>
    )
  },
})
