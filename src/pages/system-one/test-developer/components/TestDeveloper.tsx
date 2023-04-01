import useRequest from '@/hooks/use-request'
import { requestA } from './requestA'
import { requestB } from './requestB'

export const TestDeveloper = defineComponent({
  setup() {
    let timer: NodeJS.Timeout | null = null

    const { dataRef: aDataRef, runAsync: getA } = useRequest(async () => {
      const res = await requestA()

      return res.data
    })

    const { dataRef: bDataRef, runAsync: getB } = useRequest(async () => {
      const res = await requestB()

      return res.data
    })

    // check
    const check = () => {
      timer = setInterval(async () => {
        // 重新获取数据
        await getA()
        await getB()

        if (aDataRef.value !== bDataRef.value) {
          console.log('变化了')
        }
      }, 2 * 1000)
    }

    onMounted(() => {
      check()
    })

    onBeforeUnmount(() => {
      if (timer) clearInterval(timer)
    })

    return () => <>123</>
  },
})
