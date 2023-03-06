import { Transition, TransitionGroup } from 'vue'

export default defineComponent({
  setup() {
    const curTab = ref<number>(0)
    // 用于收集动画完成事件
    const oldIndexDoneMap: Record<number, { leave?: any; enter?: any }> = {}

    watch(curTab, (newValue, oldValue) => {
      // 把之前的动画全部结束
      for (const k in oldIndexDoneMap) {
        if (Number(k) !== newValue) {
          oldIndexDoneMap[k].enter?.()
          oldIndexDoneMap[k].leave?.()
        }
      }

      // 新 > 旧 ，也就是 2 -> 3 这种变化
      if (newValue > oldValue) {
        enterFromRef.value = 'un-transform un-translate-x-100%'
        leaveToRef.value = 'un-transform un-translate-x--100%'
      } else {
        enterFromRef.value = 'un-transform un-translate-x--100%'
        leaveToRef.value = 'un-transform un-translate-x-100%'
      }
    })

    const enterFromRef = ref('')
    const leaveToRef = ref('')

    const enterActive =
      'un-transition un-transition-all un-duration-1000 un-ease-in-out'

    const leaveActive =
      'un-transition un-transition-all un-duration-1000 un-ease-in-out'

    const arr = Array.from({ length: 4 }) as number[]

    return () => (
      <div class='un-h-100vh un-flex un-flex-col'>
        <NSpace>
          {arr.map((d, i) => (
            <NButton key={i} onClick={() => (curTab.value = i)}>
              {i}
            </NButton>
          ))}
        </NSpace>
        <div class='un-flex-1 un-relative un-overflow-hidden'>
          {arr.map((d, index) => {
            if (!oldIndexDoneMap[index]) oldIndexDoneMap[index] = {}

            return (
              <Transition
                appear
                onEnter={(el, done) => (oldIndexDoneMap[index]['enter'] = done)}
                onLeave={(el, done) => (oldIndexDoneMap[index]['leave'] = done)}
                enterFromClass={enterFromRef.value}
                enterActiveClass={enterActive}
                leaveActiveClass={leaveActive}
                leaveToClass={leaveToRef.value}
                key={index}
              >
                {index === curTab.value && (
                  <div class='un-w-100% un-absolute un-top-0 un-left-0'>
                    <NSpace justify='space-between'>
                      <span>{curTab.value}</span>
                      <span>{curTab.value}</span>
                    </NSpace>
                  </div>
                )}
              </Transition>
            )
          })}
        </div>
      </div>
    )
  },
})
