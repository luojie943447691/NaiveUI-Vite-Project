import axios from 'axios'

export interface Query {
  id: number
}

function getStudentList(params?: Query) {
  return axios.get('/api/getStudentList', {
    params,
  })
}

export default getStudentList
