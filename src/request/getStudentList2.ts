import axios from 'axios'

export function getStudentList2() {
  return axios.get('/api/server2/getStudentList', { params: { id: 1 } })
}

export function getStudentList2NotAPI() {
  return axios.get('/server2/getStudentList', { params: { id: 1 } })
}
