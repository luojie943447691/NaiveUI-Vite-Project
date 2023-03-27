import { UsePaginationTest } from './components/usePaginationTest'
import { UseRequestTest } from './components/useRequestTest'

export default defineComponent({
  setup() {
    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <UseRequestTest />
        <UsePaginationTest />
      </div>
    )
  },
})
