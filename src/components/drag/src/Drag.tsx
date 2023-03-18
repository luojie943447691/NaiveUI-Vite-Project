import { TransitionGroup, defineComponent } from 'vue'
import style from './Drag.module.scss'

export const Drag = defineComponent({
  setup() {
    let dragIndex: number | null = null

    function handleDragstart(e: DragEvent, index: number) {
      dragIndex = index
    }

    function handleDragover(e: DragEvent, index: number) {
      // 防止默认情况下允许删除
      e.preventDefault()
    }

    function handleDragenter(e: DragEvent, index: number) {
      e.preventDefault()

      if (dragIndex !== index) {
        const moving = list.value[dragIndex as number]
        list.value.splice(dragIndex as number, 1)
        list.value.splice(index, 0, moving)
        dragIndex = index
      }
    }

    const list = ref([
      { label: '列表1' },
      { label: '列表2' },
      { label: '列表3' },
      { label: '列表4' },
      { label: '列表5' },
      { label: '列表6' },
    ])

    const showRef = ref(false)

    return () => (
      <div class='un-h-50px un-w-200px un-m-auto un-flex un-flex-col'>
        <NButton onClick={() => (showRef.value = !showRef.value)}>切换</NButton>
        <NDrawer v-model:show={showRef.value} placement='left' width={500}>
          <NDrawerContent>
            <div class={style['ul-wrapper']}>
              <TransitionGroup
                duration={500}
                moveClass={style['drag-move']}
                tag='ul'
              >
                {list.value.map((d, index) => {
                  return (
                    <li
                      draggable
                      class={[style['list-item']]}
                      onDragstart={(e) => handleDragstart(e, index)}
                      onDragenter={(e) => handleDragenter(e, index)}
                      onDragover={(e) => handleDragover(e, index)}
                      key={`${d.label}`}
                    >
                      {d.label}
                    </li>
                  )
                })}
              </TransitionGroup>
            </div>
          </NDrawerContent>
        </NDrawer>
      </div>
    )
  },
})
