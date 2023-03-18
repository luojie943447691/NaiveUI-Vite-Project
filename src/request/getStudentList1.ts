import axios from 'axios'

export function getStudentList1() {
  return axios.get('/api/server1/getStudentList', { params: { id: 1 } })
}

export function getStudentList1NotAPI() {
  return axios.get('/server1/getStudentList', { params: { id: 1 } })
}
