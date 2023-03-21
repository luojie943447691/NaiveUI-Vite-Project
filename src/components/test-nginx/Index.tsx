import {
  getStudentList1,
  getStudentList1NotAPI,
} from '@/request/getStudentList1'
import {
  getStudentList12,
  getStudentList12NotAPI,
} from '@/request/getStudentList12'
import {
  getStudentList2,
  getStudentList2NotAPI,
} from '@/request/getStudentList2'

export const TestNginx = defineComponent({
  setup(props) {
    return () => (
      <>
        <NButton
          onClick={() => {
            getStudentList1()
          }}
        >
          向服务器1发送请求
        </NButton>
        <NButton
          onClick={() => {
            getStudentList1NotAPI()
          }}
        >
          向服务器1发送请求无 api 前缀（nginx响应）
        </NButton>
        <NButton
          onClick={() => {
            getStudentList2()
          }}
        >
          向服务器2发送请求
        </NButton>
        <NButton
          onClick={() => {
            getStudentList2NotAPI()
          }}
        >
          向服务器2发送请求无 api 前缀（nginx响应）
        </NButton>
        <NButton
          onClick={() => {
            getStudentList12()
          }}
        >
          向服务器1或者2发送请求
        </NButton>
        <NButton
          onClick={() => {
            getStudentList12NotAPI()
          }}
        >
          向服务器1或者2发送请求无 api 前缀（nginx响应）
        </NButton>
      </>
    )
  },
})
