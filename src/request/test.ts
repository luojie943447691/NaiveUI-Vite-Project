import axios from 'axios'

export interface Query {
  id: number
}

function getStudentList(params?: Query) {
  return axios.get('http://localhost:8888/getStudentList', {
    params,
  })
}

export default getStudentList
