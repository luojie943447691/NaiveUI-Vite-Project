import { TransitionGroup, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const curTab = ref<number>(0)
    // 用于收集动画完成事件
    const doneArr: (() => void)[] = []

    const enterFromRef = ref('')
    const leaveToRef = ref('')

    const arr = Array.from({ length: 4 }) as number[]

    const handleClick = (i: number) => {
      doneArr.forEach((fn) => fn())

      // 新 > 旧 ，也就是 2 -> 3 这种变化
      if (i > curTab.value) {
        enterFromRef.value = 'un-translate-x-100%'
        leaveToRef.value = 'un-translate-x--100%'
      } else {
        enterFromRef.value = 'un-translate-x--100%'
        leaveToRef.value = 'un-translate-x-100%'
      }

      curTab.value = i
    }

    // Transition 的 enter 或者 leave 的钩子。具体的执行时机需要看源码。
    return () => (
      <div class='un-h-500px un-w-200px un-m-auto un-flex un-flex-col'>
        <NSpace>
          {arr.map((d, i) => (
            <NButton key={i} onClick={() => handleClick(i)}>
              {i}
            </NButton>
          ))}
        </NSpace>
        <div class='un-flex-1 un-relative'>
          {arr.map((d, index) => {
            return (
              <TransitionGroup
                onBeforeEnter={(el) => {
                  const _el = el as HTMLElement
                  // 我们可以自定义动画时间了
                  _el.style.transition = '5000ms'
                }}
                onEnter={(el, done) => {
                  doneArr.push(done)
                  const _el = el as HTMLElement

                  // 用于正常结束时间之后移除 dom 节点
                  // vue3.2源码。 如果我们声明了 onEnter ，vue 就不会自动在 transition 结束
                  //  之后自动调用 done，这个逻辑得由我们自己控制
                  _el.ontransitionend = () => {
                    done()
                  }
                }}
                onAfterEnter={(el) => {
                  const _el = el as HTMLElement
                  _el.style.transition = ''
                }}
                onBeforeLeave={(el) => {
                  const _el = el as HTMLElement
                  _el.style.transition = '5000ms'
                }}
                onLeave={(el, done) => {
                  doneArr.push(done)
                  const _el = el as HTMLElement

                  _el.ontransitionend = () => {
                    done()
                  }
                }}
                enterActiveClass='un-transition-1000'
                enterFromClass={enterFromRef.value}
                leaveActiveClass='un-transition-1000'
                leaveToClass={leaveToRef.value}
                key={index}
              >
                {index === curTab.value && (
                  <div
                    key={index}
                    class='un-w-100% un-absolute un-top-0 un-left-0'
                  >
                    <NSpace justify='space-between'>
                      <span>{curTab.value}</span>
                      <span>{curTab.value}</span>
                    </NSpace>
                  </div>
                )}
              </TransitionGroup>
            )
          })}
        </div>
      </div>
    )
  },
})
