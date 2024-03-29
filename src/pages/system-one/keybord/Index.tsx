import { useCombinationKeycode } from '@/hooks/use-combination-keycode'

export default defineComponent({
  setup() {
    useCombinationKeycode([
      {
        keycodeCombination: 'shift + s',
        keyboardResponse() {
          console.log('按下了 shift + s')
        },
      },
      {
        keycodeCombination: 'shift + a',
        keyboardResponse() {
          console.log('按下了 shift + a')
        },
      },
      {
        keycodeCombination: 'control + q',
        keyboardResponse() {
          console.log('按下了 ctrl + q')
        },
      },
      {
        keycodeCombination: 'control + s',
        keyboardResponse() {
          console.log('按下了 ctrl + s')
        },
      },
    ])

    return () => (
      <div class='un-h-500px un-w-200px un-m-auto un-flex un-flex-col'>
        <h1>快捷键测试</h1>
      </div>
    )
  },
})
