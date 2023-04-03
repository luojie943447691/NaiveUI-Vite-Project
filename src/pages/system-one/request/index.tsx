import { UsePaginationTest } from './components/usePaginationTest'
import { UseRequestTest } from './components/useRequestTest'
import { UseSubmitTest } from './components/useSubmitTest'

export default defineComponent({
  setup() {
    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <UseRequestTest />
        <UsePaginationTest />
        <UseSubmitTest />
      </div>
    )
  },
})
