import { PropType } from 'vue'
import { Drag } from '@/components/drag'
import { TestNginx } from '@/components/test-nginx/Index'
import { useSiderCollapsed } from '@/layout/layout/src/hooks'

export default defineComponent({
  props: {},
  setup() {
    const collapsedRef = useSiderCollapsed()

    const handleHideSider = () => {
      collapsedRef.value = !collapsedRef.value
    }

    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <Drag />
        <TestNginx />
      </div>
    )
  },
})
