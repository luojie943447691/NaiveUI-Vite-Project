import axios from 'axios'

interface UserInfoQuery {
  id?: number
}

interface Input {
  current: number
  pageSize: number
  query: UserInfoQuery
}

export function paginationStudentList(input: Input) {
  return axios.post('/api/paginationStudentList', {
    ...input,
  })
}
