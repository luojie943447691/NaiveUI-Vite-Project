import axios from 'axios'

export function requestA() {
  return axios.get('./a.hash')
}
