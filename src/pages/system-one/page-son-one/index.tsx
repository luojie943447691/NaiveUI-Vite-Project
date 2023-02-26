import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  name: 'SystemOneSonOne',
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    const inputRef = ref()

    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <NButton onClick={handleHideSider}>
          隐藏边框(主1-子1)需要 keepAlive
        </NButton>
        <NInput v-model={inputRef.value} />
      </div>
    )
  },
})
