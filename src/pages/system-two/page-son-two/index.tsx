import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  name: 'SystemTwoSonTwo',
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    const inputRef = ref()

    return () => (
      <>
        <NButton onClick={handleHideSider}>
          隐藏边框(主2-子2)需要 keepAlive
        </NButton>
        <NInput v-model={inputRef.value} />
      </>
    )
  },
})
