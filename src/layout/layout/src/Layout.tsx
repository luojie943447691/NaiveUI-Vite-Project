import { RouterView } from 'vue-router'
import { RLayoutHeader } from '@/layout/layout-header'
import { LayoutMenu } from '@/layout/layout-menu'
import { useCollapsed } from './useCollapsed'
import { useLayoutInfo } from './useLayoutInfo'

export const Layout = defineComponent({
  setup(props, { slots }) {
    const layoutInfo = useLayoutInfo({ slots })
    const collapsedRef = useCollapsed()

    return () => (
      <>
        {!layoutInfo.value.hideHeader && (
          <NLayoutHeader
            bordered
            style={{
              height: 'var(--layout-header-height)',
            }}
          >
            {{
              default: slots.header,
            }}
          </NLayoutHeader>
        )}

        <NLayout hasSider={!layoutInfo.value.hideSider}>
          {{
            default: () => (
              <>
                <NLayoutSider
                  bordered
                  collapseMode='width'
                  collapsedWidth={64}
                  width='240'
                  collapsed={collapsedRef.value}
                >
                  <LayoutMenu />
                </NLayoutSider>
                <div style='position: relative;width: 100%;height: 100%;overflow: hidden;background: var(--card-color);'>
                  {slots.tabs && !layoutInfo.value.hideTabs && slots.tabs()}
                  <NLayout
                    style={{
                      height: 'calc(100vh - var(--safe-area-inset-top))',
                    }}
                  >
                    {{
                      default: () => <RouterView />,
                    }}
                  </NLayout>
                </div>
              </>
            ),
          }}
        </NLayout>
      </>
    )
  },
})
