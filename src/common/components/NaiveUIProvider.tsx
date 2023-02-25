import { useLoadingBar } from 'naive-ui'
import { setLoadingBar } from '../hooks/useLoadingBar'

export const NaiveUIProvider = defineComponent({
  setup(props, { slots }) {
    return () => (
      <NLoadingBarProvider>
        <ProvideComponent>{slots.default && slots.default()}</ProvideComponent>
      </NLoadingBarProvider>
    )
  },
})

const ProvideComponent = defineComponent({
  setup(props, { slots }) {
    const loadingBar = useLoadingBar()

    setLoadingBar(loadingBar)

    return () => <>{slots.default && slots.default()}</>
  },
})
