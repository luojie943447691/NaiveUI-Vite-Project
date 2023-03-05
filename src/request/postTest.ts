import axios from 'axios'

export interface Query {
  id: number
}

function postStudentList(params?: Query) {
  return axios.post('http://localhost:8888/postStudentList', {
    ...(params || {}),
  })
}

export default postStudentList
