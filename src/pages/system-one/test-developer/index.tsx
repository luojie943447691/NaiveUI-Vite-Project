import { TestDeveloper } from './components/TestDeveloper'

export default defineComponent({
  setup() {
    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <TestDeveloper />
      </div>
    )
  },
})
