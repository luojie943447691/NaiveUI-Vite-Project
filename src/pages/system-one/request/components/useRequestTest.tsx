import useRequest from '@/hooks/use-request'
import getStudentList from '@/request/test'

export const UseRequestTest = defineComponent({
  setup() {
    const debounceWaitRef = ref(3000)

    // 测试  request
    const { loadingRef, dataRef, cancel, run, runAsync } = useRequest(
      async () => {
        const res = await getStudentList({ id: 2 })

        // console.log('res', res)

        return res.data
      },
      {
        // -- 手动
        manual: true,
        retryCount: 3,
        // retryInterval: 2000,
        // -- 缓存
        // cacheKey: 'student-list',
        // staleTime: 5 * 1000,
        // -- 节流
        // get throttleWait() {
        //   return debounceWaitRef.value
        // },
        // -- 防抖
        // get debounceWait() {
        //   return debounceWaitRef.value
        // },
        // -- 是否准备好 等准备好再发送请求
        // ready: () => false,
        // -- 延迟将 loadingRef 设置成 true ，更好的用户体验
        // loadingDelay: 500,
        // -- 轮询错误尝试次数
        // get pollingErrorRetryCount() {
        //   return pollingErrorRetryCountRef.value
        // },
        // -- 轮询间隔时间
        // pollingInterval: 3000,
      }
    )

    return () => (
      <div>
        <div class='un-text-20px'>useRequest测试</div>
        <div class='un-text-20px un-font-bold'>
          状态：{loadingRef.value ? '加载中...' : ''}
        </div>
        <div class='un-text-20px un-font-bold'>
          数据：{dataRef?.value?.[0]?.name}
        </div>
        <NButton
          onClick={() => {
            cancel()
          }}
        >
          取消
        </NButton>
        <NButton
          onClick={() => {
            run()
          }}
        >
          发送请求
        </NButton>
        <NButton
          onClick={() => {
            debounceWaitRef.value = 1000
          }}
        >
          修改条件
        </NButton>
      </div>
    )
  },
})
