import axios from 'axios'

export function getStudentList12() {
  return axios.get('/api/server12/getStudentList', { params: { id: 1 } })
}

export function getStudentList12NotAPI() {
  return axios.get('/server12/getStudentList', { params: { id: 1 } })
}
