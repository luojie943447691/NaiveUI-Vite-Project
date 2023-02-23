import { RouterView } from 'vue-router'
import { LayoutMenu } from '../layout-menu'
import { useCollapsed } from './src/useCollapsed'
import { useLayoutInfo } from './src/useLayoutInfo'

export const Layout = defineComponent({
  setup(props, { slots }) {
    const layoutInfo = useLayoutInfo({ slots })
    const collapsedRef = useCollapsed()

    return () => (
      <NLayout hasSider>
        {!layoutInfo.value.hideSider && (
          <NLayoutSider
            bordered
            collapseMode='width'
            collapsedWidth={64}
            width='240'
            collapsed={collapsedRef.value}
          >
            <LayoutMenu />
          </NLayoutSider>
        )}
        <RouterView />
      </NLayout>
    )
  },
})
