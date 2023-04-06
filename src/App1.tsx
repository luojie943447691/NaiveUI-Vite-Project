import { useCombinationKeycode } from './hooks/useCombinationKeycode'

export default defineComponent({
  setup() {
    useCombinationKeycode([
      {
        keycodeCombination: ['shift', 's'],
        do() {
          console.log('按下了 shift + s')
        },
      },
      {
        keycodeCombination: ['shift', 'a'],
        do() {
          console.log('按下了 shift + a')
        },
      },
      {
        keycodeCombination: ['ctrl', 'a'],
        do() {
          console.log('按下了 ctrl + a')
        },
      },
      {
        keycodeCombination: ['shift', 'a', 's'],
        do() {
          console.log('按下了 shift + a + s')
        },
      },
    ])

    return () => (
      <div class='un-h-500px un-w-200px un-m-auto un-flex un-flex-col'>
        <h1>测试</h1>
      </div>
    )
  },
})
