import { DefineComponent, Transition } from 'vue'
import { RouterView } from 'vue-router'

export const LayoutContent = defineComponent({
  setup() {
    const enterFrom = 'un-opacity-0'
    const leaveTo = 'un-opacity-0'

    const enterActive =
      'un-transition un-transition-opacity un-duration-150 un-ease-in-out'

    const leaveActive =
      'un-transition un-transition-opacity un-duration-150 un-ease-in-out'

    return () => (
      <RouterView>
        {{
          default: ({ Component }: { Component: DefineComponent }) => (
            <Transition
              enterFromClass={enterFrom}
              enterActiveClass={enterActive}
              leaveActiveClass={leaveActive}
              leaveToClass={leaveTo}
              mode='out-in'
              duration={150}
              appear
            >
              <Component />
            </Transition>
          ),
        }}
      </RouterView>
    )
  },
})
